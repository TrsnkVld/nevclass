import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const MainLayout = () => import("../components/MainLayout");
const Home = () => import("../components/Home");
const Excursion = () => import("../components/Excursion");
const Excursions = () => import("../components/Excursions");
const Service = () => import("../components/Service");
const Services = () => import("../components/Services");
const ShipsList = () => import("../components/ShipsList");
const Feedback = () => import("../components/Feedback");
const Gallery = () => import("../components/Gallery");
const ErrorPage = () => import("../components/Error");
const ServerErrorPage = () => import("../components/ServerError");
const Contacts = () => import("../components/Contacts");
const Management = () => import("../components/Management");
const About = () => import("../components/About");
const Policy = () => import("../components/Policy");
const News = () => import("../components/News");
const Article = () => import("../components/Article");
const Articles = () => import("../components/Articles");
const ArticleArticles = () => import("../components/ArticleArticles");
const Faq = () => import("../components/Faq");
const Tariffs = () => import("../components/Tariffs");
const Ship = () => import("../components/Ship");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", name: "home", meta: { api: "Home" }, component: Home },
      {
        path: "/excursions/:code",
        name: "excursion",
        meta: { api: "ExcursionPage" },
        props: true,
        component: Excursion,
      },
      {
        path: "/excursions",
        name: "excursions",
        meta: { api: "Excursions" },
        component: Excursions,
      },
      {
        path: "/services",
        name: "services",
        meta: { api: "Hots" },
        component: Services,
      },
      {
        path: "/services/:code",
        name: "service",
        meta: { api: "HotPage" },
        component: Service,
      },
      {
        path: "/ships",
        name: "ships-list",
        meta: { api: "Ships" },
        component: ShipsList,
      },
      {
        path: "/ships/:code",
        name: "ship",
        meta: { api: "ShipPage" },
        props: true,
        component: Ship,
      },
      {
        path: "/feedback",
        name: "feedback",
        meta: { api: "Claims" },
        component: Feedback,
      },
      {
        path: "/gallery",
        name: "gallery",
        meta: { api: "Gallery" },
        component: Gallery,
      },
      { path: "/error", name: "error", component: ErrorPage },
      { path: "/error500", name: "error500", component: ServerErrorPage },
      { path: "/contacts", name: "contacts", component: Contacts },
      {
        path: "/management",
        name: "management",
        meta: { api: "Specialist" },
        component: Management,
      },
      {
        path: "/about",
        name: "about",
        meta: { api: "About" },
        component: About,
      },
      {
        path: "/policy",
        name: "policy",
        meta: { api: "ConfirmPage" },
        component: Policy,
      },
      { path: "/news", name: "news", meta: { api: "Pubs" }, component: News },
      {
        path: "/news/:code",
        name: "article",
        meta: { api: "PubPage" },
        props: true,
        component: Article,
      },
      {
        path: "/articles",
        name: "articles",
        meta: { api: "Articles" },
        component: Articles,
      },
      {
        path: "/articles/:code",
        name: "article-articles",
        meta: { api: "ArticlePage" },
        component: ArticleArticles,
      },
      { path: "/faq", name: "faq", meta: { api: "FAQs" }, component: Faq },
      {
        path: "/tariffs",
        name: "tariffs",
        meta: { api: "Tarifs" },
        component: Tariffs,
      },
      { path: "/*", name: "error404", component: ErrorPage },
    ],
  },
];

export default routes;
