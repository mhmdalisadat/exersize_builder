# GymPro - Workout Program Creator

![GymPro](https://img.shields.io/badge/GymPro-v1.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.x-0055FF)
![Zustand](https://img.shields.io/badge/Zustand-4.x-brown)

GymPro is a modern React application for creating structured workout programs. It provides a user-friendly interface to define workout days, assign muscle groups to each day, and create detailed exercise plans.

![GymPro Screenshot](https://via.placeholder.com/800x450.png?text=GymPro+Workout+Program+Creator)

## Features

- 📅 **Multi-day workout planning**: Define your workout schedule with up to 7 days per week
- 💪 **Muscle group targeting**: Assign specific muscle groups to each workout day
- 🏋️ **Detailed exercise definition**: Create custom exercises with sets, reps, and descriptions
- 🛌 **Rest day support**: Designate specific days as rest days
- 📊 **Program summary**: View a comprehensive overview of your entire workout program

## Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe code to reduce bugs and improve development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Zustand**: State management solution for managing application state

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ExerciseEditor.tsx            # Exercise editing component
│   ├── ExerciseList.tsx              # List of exercises with CRUD operations
│   ├── ExerciseMovement.tsx          # Exercise form component
│   ├── WorkoutProgramStep3.tsx       # Step 3 main component
│   └── WorkoutSummary.tsx            # Program summary view
├── store/           # State management
│   └── workoutStore.ts               # Zustand store for workout data
├── stepper/         # Multi-step form components
├── App.tsx          # Main application component
└── ...              # Other configuration files
```

## Application Workflow

The application guides users through a 3-step process to create their workout program:

### Step 1: Program Information

Define the program name, number of workout days per week, and program description.

### Step 2: Muscle Group Assignment

For each workout day, assign target muscle groups. Days can be designated as rest days if needed.

### Step 3: Exercise Definition

For each non-rest day, define specific exercises with details like:

- Exercise name
- Target muscle group
- Number of sets
- Number of reps
- Description

Users can switch to a summary view to see their complete workout program at any time.

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gymPro.git
cd gymPro
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder.

## Customization

### Muscle Groups

You can customize the available muscle groups by modifying the `muscleOptions` array in `App.tsx`:

```typescript
const muscleOptions = [
  { value: "chest", label: "سینه" },
  { value: "back", label: "پشت" },
  { value: "shoulders", label: "شانه" },
  { value: "arms", label: "بازو" },
  { value: "legs", label: "پا" },
  { value: "abs", label: "شکم" },
  { value: "rest", label: "استراحت" },
];
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev/)
