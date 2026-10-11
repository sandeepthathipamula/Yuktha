import { getDbPool, initDatabase, isDbConfigured } from './db.ts';
import { Proposal, StudentUser } from '../src/types/index.ts';

// Map database row to TypeScript Proposal interface
export function mapRowToProposal(row: any): Proposal {
  let referenceFiles: string[] = [];
  if (row.reference_files) {
    if (Array.isArray(row.reference_files)) {
      referenceFiles = row.reference_files;
    } else if (typeof row.reference_files === 'string') {
      try {
        referenceFiles = JSON.parse(row.reference_files);
      } catch {
        referenceFiles = [row.reference_files];
      }
    }
  }

  return {
    id: String(row.id),
    refId: String(row.ref_id),
    studentName: String(row.student_name),
    studentEmail: String(row.student_email),
    studentPhone: String(row.student_phone),
    college: String(row.college),
    title: String(row.title),
    description: String(row.description),
    technologies: String(row.technologies),
    projectType: row.project_type as 'Major Project' | 'Minor Project',
    expectedDate: String(row.expected_date || ''),
    submittedAt: String(row.submitted_at),
    status: row.status as Proposal['status'],
    guidanceCharges: Number(row.guidance_charges) || 2499,
    reviewWindow: String(row.review_window || 'Within 1 Hour'),
    teamUpdate: String(row.team_update || ''),
    referenceFiles,
    assignedAdmin: row.assigned_admin ? String(row.assigned_admin) : undefined
  };
}

export async function fetchAllProposals(studentEmail?: string): Promise<Proposal[]> {
  await initDatabase();
  const pool = getDbPool();

  if (studentEmail && studentEmail.trim().length > 0) {
    const [rows] = await pool.execute<any[]>(
      `SELECT * FROM proposals WHERE student_email = ? ORDER BY created_at DESC`,
      [studentEmail.trim()]
    );
    return rows.map(mapRowToProposal);
  }

  const [rows] = await pool.execute<any[]>(
    `SELECT * FROM proposals ORDER BY created_at DESC`
  );
  return rows.map(mapRowToProposal);
}

export async function fetchProposalById(id: string): Promise<Proposal | null> {
  await initDatabase();
  const pool = getDbPool();
  const [rows] = await pool.execute<any[]>(
    `SELECT * FROM proposals WHERE id = ? LIMIT 1`,
    [id]
  );
  if (!rows || rows.length === 0) return null;
  return mapRowToProposal(rows[0]);
}

export async function insertProposal(proposal: Proposal): Promise<Proposal> {
  await initDatabase();
  const pool = getDbPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const id = proposal.id || `prop-${Date.now()}`;
    const refId = proposal.refId || `#${Math.floor(100000 + Math.random() * 900000)}`;
    const referenceFilesJson = JSON.stringify(proposal.referenceFiles || ['Initial_Abstract_Draft.pdf']);

    // 1. Insert proposal with parameterized query
    await connection.execute(
      `INSERT INTO proposals (
        id, ref_id, student_name, student_email, student_phone, college,
        title, description, technologies, project_type, expected_date,
        submitted_at, status, guidance_charges, review_window, team_update,
        reference_files, assigned_admin
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        refId,
        proposal.studentName,
        proposal.studentEmail,
        proposal.studentPhone,
        proposal.college,
        proposal.title,
        proposal.description,
        proposal.technologies,
        proposal.projectType,
        proposal.expectedDate || '',
        proposal.submittedAt,
        proposal.status || 'New',
        proposal.guidanceCharges || 2499,
        proposal.reviewWindow || 'Within 1 Hour',
        proposal.teamUpdate || 'New student submission. Team Yuktha will review within 1 hour.',
        referenceFilesJson,
        proposal.assignedAdmin || null
      ]
    );

    // 2. Insert corresponding admin notification
    const notificationId = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    await connection.execute(
      `INSERT INTO admin_notifications (
        id, proposal_id, type, title, message, is_read
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        notificationId,
        id,
        'new_proposal',
        `New Proposal: ${proposal.title}`,
        `${proposal.studentName} from ${proposal.college} submitted proposal ${refId}`,
        false
      ]
    );

    // 3. Upsert student record into users table
    if (proposal.studentEmail) {
      await connection.execute(
        `INSERT INTO users (id, name, email, phone, college, role)
         VALUES (?, ?, ?, ?, ?, 'student')
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           phone = VALUES(phone),
           college = VALUES(college),
           updated_at = CURRENT_TIMESTAMP`,
        [
          `user-${Date.now()}`,
          proposal.studentName,
          proposal.studentEmail,
          proposal.studentPhone,
          proposal.college
        ]
      );
    }

    await connection.commit();

    return {
      ...proposal,
      id,
      refId
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export async function updateProposalById(
  id: string,
  updates: Partial<Proposal>
): Promise<Proposal> {
  await initDatabase();
  const pool = getDbPool();

  const existing = await fetchProposalById(id);
  if (!existing) {
    throw new Error(`Proposal with ID "${id}" not found`);
  }

  const updatedStatus = updates.status || existing.status;
  const updatedCharges = updates.guidanceCharges !== undefined ? updates.guidanceCharges : existing.guidanceCharges;
  const updatedTeamUpdate = updates.teamUpdate !== undefined ? updates.teamUpdate : existing.teamUpdate;
  const updatedReviewWindow = updates.reviewWindow !== undefined ? updates.reviewWindow : existing.reviewWindow;
  const updatedAssignedAdmin = updates.assignedAdmin !== undefined ? updates.assignedAdmin : (existing.assignedAdmin || null);

  await pool.execute(
    `UPDATE proposals SET
      status = ?,
      guidance_charges = ?,
      team_update = ?,
      review_window = ?,
      assigned_admin = ?
    WHERE id = ?`,
    [
      updatedStatus,
      updatedCharges,
      updatedTeamUpdate,
      updatedReviewWindow,
      updatedAssignedAdmin,
      id
    ]
  );

  return {
    ...existing,
    ...updates,
    status: updatedStatus,
    guidanceCharges: updatedCharges,
    teamUpdate: updatedTeamUpdate,
    reviewWindow: updatedReviewWindow,
    assignedAdmin: updatedAssignedAdmin || undefined
  };
}

export async function deleteProposalById(id: string): Promise<boolean> {
  await initDatabase();
  const pool = getDbPool();
  const [result]: any = await pool.execute(
    `DELETE FROM proposals WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

export async function fetchAdminNotifications(): Promise<any[]> {
  await initDatabase();
  const pool = getDbPool();
  const [rows] = await pool.execute<any[]>(
    `SELECT n.*, p.ref_id, p.student_name, p.title as proposal_title
     FROM admin_notifications n
     LEFT JOIN proposals p ON n.proposal_id = p.id
     ORDER BY n.created_at DESC
     LIMIT 50`
  );
  return rows.map(r => ({
    id: r.id,
    proposalId: r.proposal_id,
    type: r.type,
    title: r.title,
    message: r.message,
    isRead: Boolean(r.is_read),
    createdAt: r.created_at,
    refId: r.ref_id,
    studentName: r.student_name,
    proposalTitle: r.proposal_title
  }));
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  await initDatabase();
  const pool = getDbPool();
  const [result]: any = await pool.execute(
    `UPDATE admin_notifications SET is_read = TRUE WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

export async function upsertStudentUser(student: StudentUser): Promise<StudentUser> {
  await initDatabase();
  const pool = getDbPool();
  await pool.execute(
    `INSERT INTO users (id, name, email, phone, college, role)
     VALUES (?, ?, ?, ?, ?, 'student')
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       phone = VALUES(phone),
       college = VALUES(college),
       updated_at = CURRENT_TIMESTAMP`,
    [
      student.id || `student-${Date.now()}`,
      student.name,
      student.email,
      student.phone,
      student.college
    ]
  );
  return student;
}
