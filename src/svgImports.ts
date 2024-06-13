import { motion } from "framer-motion"

import { ReactComponent as MenuIconSVG } from "./icon/navBarIcons/menuIcon.svg";
import { ReactComponent as HomeIconSVG } from "./icon/navBarIcons/homeIcon.svg";
import { ReactComponent as AboutIconSVG } from "./icon/navBarIcons/personIcon.svg";
import { ReactComponent as ProjectsIconSVG } from "./icon/navBarIcons/projectsIcon.svg";

import { ReactComponent as GithubIcon } from './icon/footerIcons/githubIcon.svg'
import { ReactComponent as LinkedinIcon } from './icon/footerIcons/linkedinIcon.svg'
import { ReactComponent as LoadingIcon } from './icon/loadingIcon/loadingIcon.svg'

const MotionMenuIcon = motion(MenuIconSVG);
const MotionHomeIcon = motion(HomeIconSVG);
const MotionAboutIcon = motion(AboutIconSVG);
const MotionProjectsIcon = motion(ProjectsIconSVG);

const MotionGitHubIcon = motion(GithubIcon);
const MotionLinkendinIcon = motion(LinkedinIcon);

const MotionLoadingIcon = motion(LoadingIcon);



export { MotionMenuIcon, MotionHomeIcon, MotionAboutIcon, MotionProjectsIcon, MotionGitHubIcon, MotionLinkendinIcon, MotionLoadingIcon }