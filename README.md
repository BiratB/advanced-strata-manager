# SP95162 Committee Dashboard: Secure Login Flow

This module controls access to the SP95162 backend using session-based PHP authentication. It includes the following pages:

## 🔐 Core Pages

| Page         | Purpose                                  |
|--------------|------------------------------------------|
| `index.php`  | Redirects users to login or dashboard    |
| `login.php`  | Accepts credentials, creates session     |
| `home.php`   | Main dashboard (protected by session)    |
| `logout.php` | Ends session and redirects to login      |

## 🛠️ How It Works

1. Visitor lands on `index.php`
2. If session exists, redirect to `home.php`; else to `login.php`
3. `login.php` authenticates user and sets `$_SESSION['user']`
4. `home.php` shows dashboard if session is valid
5. `logout.php` clears session and redirects to `index.php`

## 👥 Credentials (Test Users)

```php
$validUsers = [
  'admin' => 'secret123',
  'committee' => 'secure456'
];
Deployment Notes
Test locally in Replit or localhost (XAMPP / MAMP)

On server, make sure .php processing is enabled

Confirm session starts via session_start() in each protected file

Use dashboard-style.css for shared UI consistency

---

## 🧪 Local Test Flow

1. Run project in **Replit** or **local server**
2. Open `index.php` → it should redirect to `login.php`
3. Log in with `admin / secret123` or `committee / secure456`
4. You should land on `home.php` with session confirmation
5. Click “Logout” — it should clear the session and return to login

✅ If that works, your session logic is healthy.

---

## 🧬 Deployment Guide

Since you’re using **Replit** and planning for **GitHub → Vercel**, here’s what to check:

1. **Final Files to Push:**
   - `index.php`, `login.php`, `home.php`, `logout.php`
   - `dashboard-style.css`
   - Any dashboard modules (like `summary-Dashboard.php`, etc.)

2. **Push to GitHub:**
   - Use your GitHub repo (`advanced-strata-manager`) or start fresh
   - Drag or commit your `.php` files into the backend folder

3. **Deploy via Vercel (Optional):**
   - Vercel’s native PHP support is limited — it’s better for frontend
   - For backend, use **Replit**, or consider **deploying to InfinityFree or 000Webhost**

---

Ready to write your README file into your GitHub repo directly, or want help converting this into a `.txt` for quick drag-and-drop? Let me know if you'd like to also generate a “public dashboard info page” next (for unauthenticated visitors)!
