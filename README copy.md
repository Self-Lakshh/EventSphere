
### 🧠 **MySQL Database Schema Plan**

#### 🔐 `users`
Stores both normal users and admins (use a role column to differentiate)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  passwordHased VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### 📅 `events`
Events created by admin



### ✅ `forms`  
Each form is tied to an event.

```sql
CREATE TABLE forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
```

---

### ✅ `form_submissions`  
Each submission captures fixed fields for a specific form.

```sql
CREATE TABLE form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_id INT NOT NULL,
  user_id INT NOT NULL,
  enrollment_id VARCHAR(50),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  year VARCHAR(10),
  sem VARCHAR(10),
  phone VARCHAR(20),
  age INT,
  gender ENUM('male', 'female', 'other'),
  address TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  start_date DATETIME,
  end_date DATETIME,
  isActive BOOLEAN DEFAULT FALSE,
  is_feedback_enabled BOOLEAN DEFAULT FALSE, -- Enable/disable feedback
  speaker_details JSON, -- Store structured speaker data (or use TEXT if preferred)
  image_base64 LONGTEXT, -- Base64 encoded image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
);

```
```sql
CREATE TABLE event_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)    
);
```

```sql
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('announcement', 'reminder', 'alert') DEFAULT 'announcement',
  created_by INT, -- Admin who created the notification
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
```

Awesome — your finalized database schema looks super clean and practical! 🎯 The fixed fields in `form_submissions` simplify things, and the feedback + notifications tables round out the core experience. Now let's define **all the API endpoints** your EventHub backend will need.

---

## 📡 API Endpoint List for EventHub

Grouped by module (RESTful structure):

---

### 🔐 Auth APIs

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | Login & get JWT token     |
| GET    | `/api/auth/me`       | Get current logged-in user info (token-based) |

---

### 👤 Users (Admin-focused)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/users`          | Get all users (admin)    |
| GET    | `/api/users/:id`      | Get user by ID           |
| DELETE | `/api/users/:id`      | Delete user              |

---

### 📅 Events

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/events`       | Create new event (admin)        |
| GET    | `/api/events`       | Get all events                  |
| GET    | `/api/events/:id`   | Get event details by ID         |
| PUT    | `/api/events/:id`   | Update event (admin)            |
| DELETE | `/api/events/:id`   | Delete event (admin)            |

---

### 📝 Forms

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | `/api/forms`           | Create form for an event (admin)     |
| GET    | `/api/forms`           | Get all forms                        |
| GET    | `/api/forms/:id`       | Get form details                     |
| GET    | `/api/events/:id/forms`| Get all forms for a specific event   |
| DELETE | `/api/forms/:id`       | Delete a form                        |

---

### 🧾 Form Submissions

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/api/forms/:id/submit`     | Submit form for an event             |
| GET    | `/api/forms/:id/submissions`| Get all submissions (admin only)     |
| GET    | `/api/submissions/:id`      | Get single submission by ID (admin)  |

---

### 🌟 Event Feedback

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| POST   | `/api/events/:id/feedback`| Submit feedback after event    |
| GET    | `/api/events/:id/feedback`| Get all feedback for an event  |
| GET    | `/api/events/:id/rating`| Get all feedback rating avg for an event  |

---

### 🔔 Notifications

| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/api/notifications`| Create a notification (admin)       |
| GET    | `/api/notifications`| Get all active notifications        |
| DELETE | `/api/notifications/:id` | Delete/deactivate notification (admin) |

---

### ✅ Utility (optional)

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/api/stats`     | Get dashboard stats (admin)      |

---

## ✅ Next Steps

Let me know:
1. Should we scaffold **Auth module** next? (Register + Login + JWT)
2. Or start setting up **Event + Form creation** flow for admin?

Let’s build this piece by piece 🔧🔥