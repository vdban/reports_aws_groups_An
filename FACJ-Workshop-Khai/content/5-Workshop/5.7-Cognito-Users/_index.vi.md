---
title: "5.7 Tài khoản Cognito"
date: 2026-07-01
weight: 7
chapter: false
pre: " <b>  </b> "
---

# Tạo tài khoản demo trên Cognito

Production dùng **Amazon Cognito** thay JWT local. Stack CloudFormation đã tạo user **`admin`**; cần **đặt mật khẩu** và thêm user demo.

---

## Tài khoản demo (production)

| Username | Password | Role |
|----------|----------|------|
| `admin` | `Admin@Demo2024` | Admin |
| `user1` | `User1@Demo2024` | User |
| `user2` | `User2@Demo2024` | User |

Mật khẩu Cognito: tối thiểu 8 ký tự, có chữ hoa, chữ thường, số (ký tự đặc biệt tuỳ policy).

---

## Cách A — Script (khuyến nghị)

```powershell
# Đặt mật khẩu admin + tạo user1, user2
.\infrastructure\scripts\init-cognito-admin.ps1 `
  -UserPoolId "ap-southeast-2_XXXXX" `
  -AdminPassword "Admin@Demo2024"

# Hoặc bash
bash infrastructure/scripts/seed-cognito-demo.sh ap-southeast-2_XXXXX
```


---

## Cách B — AWS Console

### Bước 1 — Mở User Pool

**Cognito** → **User pools** → **`smarthome-users`** → **Users**.

![Cognito Users list](/images/workshop/5.7-02-cognito-users-list.png)

### Bước 2 — Đặt mật khẩu cho `admin`

1. Chọn user **`admin`** → **Actions** → **Reset password** (hoặc **Set password** nếu CONFIRMED).
2. Chọn **Set a password** → nhập `Admin@Demo2024` → **Save**.

3. Tab **Group memberships** → xác nhận user thuộc nhóm **`admin`**.

![Admin trong group admin](/images/workshop/5.7-04-cognito-admin-group.png)

### Bước 3 — Tạo user `user1`

1. **Create user**:
   - **Username:** `user1`
   - **Email:** (tuỳ chọn)
   - **Temporary password:** bỏ tick "Send invitation" nếu lab
   - **Mark email as verified:** tuỳ chọn
2. **Set password** → `User1@Demo2024` → permanent.
3. **Add user to group** → **`user`**.

![Tạo user user1](/images/workshop/5.7-05-cognito-create-user1.png)


### Bước 4 — Tạo user `user2`

Lặp lại Bước 3 với `user2` / `User2@Demo2024` / group **`user`**.



---

## Kiểm tra App client

**App integration** → **App clients** → client **`smarthome-web`**:

- **Authentication flows:** `ALLOW_USER_PASSWORD_AUTH`, `ALLOW_REFRESH_TOKEN_AUTH`
- **No client secret** (public SPA)

![Cognito app client settings](/images/workshop/5.7-08-cognito-app-client.png)

