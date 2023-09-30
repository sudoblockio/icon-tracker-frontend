import React, { useEffect } from "react";
import { LoadingComponent } from "../../components";

const TabTable2 = props => {
  useEffect(() => {
    const handleKeyDown = e => {
      // const { TABS, on } = props;
      // const { code } = e;
      // switch (code) {
      //     case "ArrowLeft":
      //         const prev = on - 1;
      //         if (prev >= 0) {
      //             props.changeTab(prev);
      //         }
      //         break;
      //     case "ArrowRight":
      //         const next = on + 1;
      //         if (next < TABS.length) {
      //             props.changeTab(next);
      //         }
      //         break;
      //     default:
      // }
    };
    //
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { on, loading, TableContents, children } = props;

  const Contents = () => {
    if (loading) {
      return <LoadingComponent height="513px" />;
    } else {
      const { TABS } = props;
      return (
        <div className="screen1">
          <div className="wrap-holder">
            <div className="tab-holder">
              <ul>
                {TABS.map((tab, index) => (
                  <li
                    key={index}
                    className={on === index ? "on" : ""}
                    onClick={() => {
                      props.onClickTab(index);
                    }}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>
            {children}
          </div>
        </div>
      );
    }
  };

  return Contents();
};

export default TabTable2;
