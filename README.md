
<h5  align ="center"> 
   <br />
  <div style="border-radius:5px;">
     <a target="_blank">
      <img src="https://res.cloudinary.com/dvukj9sqf/image/upload/r_30/v1736608502/Add_a_heading_pxzfnw.png" alt="Project Banner">
    </a>
  </div>
</h5>
<div align ="center">
  <h1 align ="center" > AI Meal Planner </h1>
  <br />
AI Meal Planner is an intelligent tool designed to generate personalized meal plans based on user inputs such as weight, age, height, and dietary preferences. It leverages AI to suggest balanced and nutritious meals for breakfast, lunch, dinner, and snacks, ensuring users meet their dietary goals. The meal plan is provided in a structured format, making it easy to follow and implement.
<br/>
   <br />
   <div>
     <img src="https://img.shields.io/badge/OpenAPI-black?style=for-the-badge&logo=OpenAPI-Initiative&logoColor=white&color=85EA2D" alt="OpenAPI" />
<img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Mongodb-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
     <img src="https://img.shields.io/badge/Cloudinary-black?style=for-the-badge&logo=Cloudinary&logoColor=white&color=3448C5" alt="Cloudinary" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/Zustand-black?style=for-the-badge&logo=React&logoColor=white&color=2E8B57" alt="Zustand" />
  <img src="https://img.shields.io/badge/Stripe-black?style=for-the-badge&logo=stripe&logoColor=white&color=6772E5" alt="Stripe" />
<img src="https://img.shields.io/badge/Clerk-black?style=for-the-badge&logo=Clerk&logoColor=white&color=4F4F4F" alt="Clerk" />


  </div>
</div>
 <br />


## 📋 <a name="table">Table of Contents</a>



1. 🤖 [Introduction](#introduction)
2. 📸 [Screen Shot](#images)
3. 🤸 [Quick Start](#quick-start)
4. 🔋 [Features](#features)
5. ⚙️ [Tech Stack](#tech-stack)
7. 🔗 [Author](#author)


## Images

()[]
![Home Screen](https://res.cloudinary.com/dvukj9sqf/image/upload/v1736660824/Screenshot_2025-01-12_at_08-40-11_Create_Next_App_wvgyub.png)
![Meal Screen](https://res.cloudinary.com/dvukj9sqf/image/upload/v1736660828/Screenshot_2025-01-12_at_08-45-52_Create_Next_App_lkvwi6.png)
![Recipe Screen](https://res.cloudinary.com/dvukj9sqf/image/upload/v1736660833/Screenshot_2025-01-12_at_08-46-22_Create_Next_App_a2makl.png)

##  Quick Start

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

```
cd ai-meal-planner
```
Install dependencies

```
npm install
```
Set up environment variables

Create a .env.local file at the root of the project and add the following:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000


OPENAI_API_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
CLERK_SIGNING_SECRET=

MONGODB_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


```
4. Run the app locally
```
npm run dev
```
The app will be available at http://localhost:3000.





## Features

1. **Personalized Meal Plans:** Users input their preferences (calories, protein, etc.), and the app generates a custom meal plan using OpenAI's GPT-3 model.

2. **AI-Generated Dish Images:** Dish names in meal plans are used to generate realistic and high-quality images using DALL·E.

3. **Credits System:** Users can purchase or earn credits to generate meal plans and AI-generated dish images.

4. **User Authentication:** Secure sign-up and login functionality powered by Clerk.

5. **Responsive UI:** Built with Tailwind CSS for a mobile-first and user-friendly design.

6. **State Management:** Global state management is handled efficiently using Zustand, allowing smooth management of user preferences, meal plans, and credits.

7. **API Integration:** Fetches meal plans dynamically using the OpenAI API, based on user inputs for precise and personalized results.
Real-time Meal Plan Generation: Generate meal plans in real-time and display them in an organized format.


<br/>



##  Tech Stack

This project was created using the following technologies.


- Next.js: React framework for building server-side rendered applications.
- TypeScript: Type-safe JavaScript superset for better development experience.
- Zustand: A fast, simple state management library for React.
- OpenAI API: GPT-3 model for generating meal plans based on user input.
- Clerk: User authentication library for sign-up, login, and session management.
- Tailwind CSS: A utility-first CSS framework for fast styling.
- Stripe: Payment gateway integration for managing subscriptions and transactions.
- Cloudinary: Media management platform for optimizing and serving images.
- Shadcn UI: A modern, customizable component library for building polished UIs.
- Lucide-react: Icon library for adding clean and lightweight icons to your application.
 
 

## Author

- Github: [@SarahNaif](https://github.com/SarahNaif)
- Linkedin: [@sarah-althowebi](https://www.linkedin.com/in/sarah-althowebi/)
- Email: [sarah.althowebi@gmail.com](mailto:sarah.althowebi@gmail.com)
 
 
 
