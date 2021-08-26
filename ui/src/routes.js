import IssueListWithToast from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEditWithToast from './IssueEdit.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';

const routes = [
  { path: '/issues/:id?', component: IssueListWithToast },
  { path: '/edit/:id', component: IssueEditWithToast },
  { path: '/report', component: IssueReport },
  { path: '/about', component: About },
  { path: '*', component: NotFound },
];

export default routes;
