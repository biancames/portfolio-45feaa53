import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import MaisSobre from "@/pages/MaisSobre";
import Admin from "@/pages/Admin";
import ProjectDetail from "@/pages/ProjectDetail";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import CustomCursor from "@/components/CustomCursor";
import { ProjectCursorLabel } from "@/components/ProjectCursorLabel";

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <CustomCursor />
      <ProjectCursorLabel />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projetos" component={Projects} />
        <Route path="/maissobre" component={MaisSobre} />
        <Route path="/admin" component={Admin} />
        <Route path="/:slug" component={ProjectDetail} />
      </Switch>
      <DarkModeSwitch dark={dark} onToggle={() => setDark((d) => !d)} />
    </>
  );
}
