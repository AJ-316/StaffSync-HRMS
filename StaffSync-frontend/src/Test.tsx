import Markdown from "react-markdown";

const Test = () => {
    const txt =
`
StaffSync HRMS
# StaffSync HRMS
## StaffSync HRMS

Welcome to the **StaffSync** project! 🚀

---

## ✨ Features

- [x] Employee Management
- [x] Salary Calculation
- [x] Leave Tracking
- [ ] AI-driven Analytics

> block 
---

## 📊 Sample Table

| Name     | Role        | Department   |
|----------|-------------|--------------|
| Alice    | Developer   | Engineering  |
| Bob      | HR Manager  | HR           |

---

## 🔧 Code Example`

    return (
        <div>
            <article className="prose">
                <Markdown >{txt}</Markdown>
            </article>
        </div>
    )
}

export default Test;