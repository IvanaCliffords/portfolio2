import coolHealthIsland from "../../assets/islands/coolhealth-mediterranean-island.svg";
import salesLabXIsland from "../../assets/islands/saleslabx-mediterranean-island.svg";
import freeWaterIsland from "../../assets/islands/freewater-mediterranean-island.svg";

import "./ProjectIslands.css";

const projects = [
  {
    id: "coolhealth",
    company: "CoolHealth",
    role: "Junior Frontend Developer > Frontend Developer Consultant",
    island: coolHealthIsland,
  },
  {
    id: "saleslabx",
    company: "SalesLabX",
    role: "Senior Frontend Developer > Developer Team Lead",
    island: salesLabXIsland,
  },
  {
    id: "freewater",
    company: "FreeWater",
    role: "Full-Stack Developer",
    island: freeWaterIsland,
  },
];

const ProjectIslands = () => {
  return (
    <div className="journey-projects">
      <div className="journey-project-track">
        {/* Empty space before the first island */}
        <div
          className="journey-project-intro-space"
          aria-hidden="true"
        />

        {projects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className={`journey-project journey-project--${project.id}`}
          >
            <div className="journey-project-copy">

              <h2 className="journey-project-title">
                {project.company}
              </h2>

              <p className="journey-project-role">
                {project.role}
              </p>

              <button
                type="button"
                className="journey-project-link"
              >
                Explore
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <img
              src={project.island}
              alt=""
              className="journey-project-island"
              aria-hidden="true"
            />
          </article>
        ))}

        <div
          className="journey-project-outro-space"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProjectIslands;