const API = '/api/users';
const $ = (sel) => document.querySelector(sel);
const statusEl = $('#status');
const tbody = $('#users-body');
const form = $('#user-form');
const toast = $('#toast');

function showToast(message, kind = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${kind}`;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.className = 'toast';
  }, 2400);
}

function setStatus(state, text) {
  statusEl.className = `status ${state}`;
  statusEl.textContent = text;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderUsers(users) {
  if (!users.length) {
    tbody.innerHTML = '<tr class="empty"><td colspan="5">No users yet — create one to get started.</td></tr>';
    return;
  }

  tbody.innerHTML = users
    .map((u) => {
      const role = String(u.role || 'member').toLowerCase();
      return `
        <tr data-id="${escapeHtml(u.id)}">
          <td><code>${escapeHtml(u.id)}</code></td>
          <td>${escapeHtml(u.name)}</td>
          <td>${escapeHtml(u.email)}</td>
          <td><span class="role-pill ${escapeHtml(role)}">${escapeHtml(role)}</span></td>
          <td style="text-align:right">
            <button class="btn danger" data-action="delete" data-id="${escapeHtml(u.id)}">Delete</button>
          </td>
        </tr>
      `;
    })
    .join('');
}

async function loadUsers() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    renderUsers(users);
    setStatus('ok', `online · ${users.length} user${users.length === 1 ? '' : 's'}`);
  } catch (err) {
    setStatus('err', 'offline');
    showToast(`Failed to load users: ${err.message}`, 'error');
  }
}

async function createUser(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function deleteUser(id) {
  const res = await fetch(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    await createUser(data);
    form.reset();
    showToast(`Created ${data.name}`, 'success');
    await loadUsers();
  } catch (err) {
    showToast(`Create failed: ${err.message}`, 'error');
  }
});

tbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-action="delete"]');
  if (!btn) return;
  const id = btn.dataset.id;
  if (!confirm(`Delete user "${id}"?`)) return;
  try {
    await deleteUser(id);
    showToast(`Deleted ${id}`, 'success');
    await loadUsers();
  } catch (err) {
    showToast(`Delete failed: ${err.message}`, 'error');
  }
});

$('#refresh').addEventListener('click', loadUsers);

loadUsers();
