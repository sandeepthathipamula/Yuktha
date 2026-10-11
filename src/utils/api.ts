import { Proposal, StudentUser } from '../types';

export interface DbHealthStatus {
  configured: boolean;
  connected: boolean;
  message: string;
}

export async function checkDbHealth(): Promise<DbHealthStatus> {
  try {
    const res = await fetch('/api/health');
    const json = await res.json();
    return {
      configured: json.status !== 'waiting_for_config',
      connected: json.database === true,
      message: json.message || ''
    };
  } catch (err: any) {
    return {
      configured: false,
      connected: false,
      message: err.message || 'Cannot reach API server'
    };
  }
}

export async function fetchProposalsFromApi(studentEmail?: string): Promise<{ proposals: Proposal[]; fromDb: boolean; error?: string }> {
  try {
    const url = studentEmail ? `/api/proposals?email=${encodeURIComponent(studentEmail)}` : '/api/proposals';
    const res = await fetch(url);
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        proposals: [],
        fromDb: false,
        error: errJson.message || `Server responded with status ${res.status}`
      };
    }
    const data = await res.json();
    return { proposals: data, fromDb: true };
  } catch (err: any) {
    return { proposals: [], fromDb: false, error: err.message };
  }
}

export async function createProposalInApi(proposal: Proposal): Promise<{ proposal: Proposal; fromDb: boolean; error?: string }> {
  try {
    const res = await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposal)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        proposal,
        fromDb: false,
        error: errJson.message || `Failed to save to database (${res.status})`
      };
    }

    const saved = await res.json();
    return { proposal: saved, fromDb: true };
  } catch (err: any) {
    return { proposal, fromDb: false, error: err.message };
  }
}

export async function updateProposalInApi(proposal: Proposal): Promise<{ proposal: Proposal; fromDb: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/proposals/${encodeURIComponent(proposal.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: proposal.status,
        guidanceCharges: proposal.guidanceCharges,
        teamUpdate: proposal.teamUpdate,
        reviewWindow: proposal.reviewWindow,
        assignedAdmin: proposal.assignedAdmin
      })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        proposal,
        fromDb: false,
        error: errJson.message || `Failed to update database (${res.status})`
      };
    }

    const updated = await res.json();
    return { proposal: updated, fromDb: true };
  } catch (err: any) {
    return { proposal, fromDb: false, error: err.message };
  }
}

export async function deleteProposalInApi(id: string): Promise<{ success: boolean; fromDb: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/proposals/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        fromDb: false,
        error: errJson.message || `Failed to delete from database (${res.status})`
      };
    }

    return { success: true, fromDb: true };
  } catch (err: any) {
    return { success: false, fromDb: false, error: err.message };
  }
}

export async function fetchAdminNotificationsFromApi(): Promise<any[]> {
  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function markNotificationReadInApi(id: string): Promise<void> {
  try {
    await fetch(`/api/notifications/${encodeURIComponent(id)}/read`, {
      method: 'PATCH'
    });
  } catch (e) {
    console.error('Failed to mark notification read', e);
  }
}

export async function syncStudentUserInApi(student: StudentUser): Promise<void> {
  try {
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
  } catch (e) {
    console.error('Failed to sync student user', e);
  }
}
