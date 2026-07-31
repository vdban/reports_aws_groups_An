---

title: "5.7 Cognito Users"

date: 2026-07-01

weight: 7

chapter: false

pre: " <b>  </b> "

---



# Create demo accounts on Cognito



Production uses **Amazon Cognito** instead of local JWT. CloudFormation stack already created user **`admin`**; you need to **set password** and add demo users.



---



## Demo accounts (production)



| Username | Password | Role |

|----------|----------|------|

| `admin` | `Admin@Demo2024` | Admin |

| `user1` | `User1@Demo2024` | User |

| `user2` | `User2@Demo2024` | User |



Cognito password: minimum 8 characters, uppercase, lowercase, number (special character per policy).



---



## Method A — Script (recommended)



```powershell

# Set admin password + create user1, user2

.\infrastructure\scripts\init-cognito-admin.ps1 `

  -UserPoolId "ap-southeast-2_XXXXX" `

  -AdminPassword "Admin@Demo2024"



# Or bash

bash infrastructure/scripts/seed-cognito-demo.sh ap-southeast-2_XXXXX

```





---



## Method B — AWS Console



### Step 1 — Open User Pool



**Cognito** → **User pools** → **`smarthome-users`** → **Users**.



![Cognito Users list](/images/workshop/5.7-02-cognito-users-list.png)



### Step 2 — Set password for `admin`



1. Select user **`admin`** → **Actions** → **Reset password** (or **Set password** if CONFIRMED).

2. Select **Set a password** → enter `Admin@Demo2024` → **Save**.



3. **Group memberships** tab → confirm user belongs to **`admin`** group.



![Admin in admin group](/images/workshop/5.7-04-cognito-admin-group.png)



### Step 3 — Create user `user1`



1. **Create user**:

   - **Username:** `user1`

   - **Email:** (optional)

   - **Temporary password:** uncheck "Send invitation" for lab

   - **Mark email as verified:** optional

2. **Set password** → `User1@Demo2024` → permanent.

3. **Add user to group** → **`user`**.



![Create user user1](/images/workshop/5.7-05-cognito-create-user1.png)





### Step 4 — Create user `user2`



Repeat Step 3 with `user2` / `User2@Demo2024` / group **`user`**.







---



## Verify App client



**App integration** → **App clients** → client **`smarthome-web`**:



- **Authentication flows:** `ALLOW_USER_PASSWORD_AUTH`, `ALLOW_REFRESH_TOKEN_AUTH`

- **No client secret** (public SPA)



![Cognito app client settings](/images/workshop/5.7-08-cognito-app-client.png)



