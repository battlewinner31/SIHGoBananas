import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Challenges } from "./pages/Challenges";
import { ChallengeDetail } from "./pages/ChallengeDetail";
import { Solutions } from "./pages/Solutions";
import { StartupList } from "./pages/StartupList";
import { StartupProfile } from "./pages/StartupProfile";
import { HowItWorks } from "./pages/HowItWorks";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { GovDashboard } from "./pages/GovDashboard";
import { StartupDashboard } from "./pages/StartupDashboard";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "challenges", Component: Challenges },
      { path: "challenges/:id", Component: ChallengeDetail },
      { path: "solutions", Component: Solutions },
      { path: "solutions/:areaId", Component: StartupList },
      { path: "startups/:id", Component: StartupProfile },
      { path: "how-it-works", Component: HowItWorks },
      { path: "about", Component: About },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "dashboard/government", Component: GovDashboard },
      { path: "dashboard/startup", Component: StartupDashboard },
    ],
  },
]);
