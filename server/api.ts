import express, { Request, Response } from 'express';
import {
  fetchAllProposals,
  fetchProposalById,
  insertProposal,
  updateProposalById,
  deleteProposalById,
  fetchAdminNotifications,
  markNotificationAsRead,
  upsertStudentUser
} from './proposalsService.ts';
import { isDbConfigured, testConnection } from './db.ts';
import { Proposal, StudentUser } from '../src/types/index.ts';

export const apiRouter = express.Router();

apiRouter.use(express.json());

// 1. Health check & database connection status
apiRouter.get('/health', async (_req: Request, res: Response) => {
  const configured = isDbConfigured();
  if (!configured) {
    return res.json({
      status: 'waiting_for_config',
      database: false,
      message: 'DATABASE_URL not set in .env. Waiting for MySQL connection string.'
    });
  }

  const check = await testConnection();
  if (!check.connected) {
    return res.status(503).json({
      status: 'connection_error',
      database: false,
      message: check.message
    });
  }

  return res.json({
    status: 'connected',
    database: true,
    message: 'MySQL database is active and ready.'
  });
});

// 2. Fetch all proposals (or filter by ?email=)
apiRouter.get('/proposals', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'Database connection string is required in .env (DATABASE_URL).'
      });
    }

    const email = req.query.email ? String(req.query.email) : undefined;
    const proposals = await fetchAllProposals(email);
    return res.json(proposals);
  } catch (err: any) {
    console.error('[API Error] GET /api/proposals:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to retrieve proposals from MySQL database.'
    });
  }
});

// 3. Fetch proposal by ID
apiRouter.get('/proposals/:id', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured.'
      });
    }

    const proposal = await fetchProposalById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Proposal not found' });
    }
    return res.json(proposal);
  } catch (err: any) {
    console.error('[API Error] GET /api/proposals/:id:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to fetch proposal.'
    });
  }
});

// 4. Create new proposal (Student submission)
apiRouter.post('/proposals', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env. Cannot persist to MySQL.'
      });
    }

    const body: Proposal = req.body;

    // Server-side validation
    if (!body.title || !body.title.trim()) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Project title is required' });
    }
    if (!body.studentName || !body.studentName.trim()) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Student name is required' });
    }
    if (!body.studentPhone || !body.studentPhone.trim()) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'WhatsApp phone number is required' });
    }

    const created = await insertProposal(body);
    return res.status(201).json(created);
  } catch (err: any) {
    console.error('[API Error] POST /api/proposals:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to save proposal to MySQL.'
    });
  }
});

// 5. Update proposal status, charges, or team note (Admin action)
apiRouter.patch('/proposals/:id', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env.'
      });
    }

    const { id } = req.params;
    const updates = req.body;

    // Validate valid status if provided
    const validStatuses = ['New', 'Contacted', 'In Review', 'Converted', 'Completed'];
    if (updates.status && !validStatuses.includes(updates.status)) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await updateProposalById(id, updates);
    return res.json(updated);
  } catch (err: any) {
    console.error('[API Error] PATCH /api/proposals/:id:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to update proposal in MySQL.'
    });
  }
});

// 6. Delete proposal
apiRouter.delete('/proposals/:id', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env.'
      });
    }

    const { id } = req.params;
    const success = await deleteProposalById(id);
    if (!success) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Proposal not found' });
    }
    return res.json({ success: true, message: 'Proposal deleted from MySQL.' });
  } catch (err: any) {
    console.error('[API Error] DELETE /api/proposals/:id:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to delete proposal.'
    });
  }
});

// 7. Get admin notifications
apiRouter.get('/notifications', async (_req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env.'
      });
    }

    const notifications = await fetchAdminNotifications();
    return res.json(notifications);
  } catch (err: any) {
    console.error('[API Error] GET /api/notifications:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to retrieve notifications.'
    });
  }
});

// 8. Mark notification as read
apiRouter.patch('/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env.'
      });
    }

    const success = await markNotificationAsRead(req.params.id);
    return res.json({ success });
  } catch (err: any) {
    console.error('[API Error] PATCH /api/notifications/:id/read:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to update notification.'
    });
  }
});

// 9. Upsert student user profile
apiRouter.post('/students', async (req: Request, res: Response) => {
  try {
    if (!isDbConfigured()) {
      return res.status(503).json({
        error: 'DATABASE_NOT_CONFIGURED',
        message: 'DATABASE_URL is not configured in .env.'
      });
    }

    const student: StudentUser = req.body;
    if (!student.name || !student.email) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Name and email are required' });
    }

    const saved = await upsertStudentUser(student);
    return res.json(saved);
  } catch (err: any) {
    console.error('[API Error] POST /api/students:', err.message);
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: err.message || 'Failed to save student in MySQL.'
    });
  }
});
