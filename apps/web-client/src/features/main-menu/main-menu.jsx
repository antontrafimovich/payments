import { useMemo } from "react";
import { Menu } from "../../ui-kit";

export const MainMenu = () => {
  const items = useMemo(() => {
    return [
      {
        title: "Home",
        key: "Home",
        label: "Home",
      },
      {
        title: "Maps",
        key: "Maps",
        label: "Maps",
      },
    ];
  }, []);

  return <Menu items={items} mode='horizontal' />;
};
