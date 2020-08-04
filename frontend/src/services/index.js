import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = 'https://iron-job-hunter.herokuapp.com/')
    // (baseURL = "window.location.origin")
  : (baseURL = "http://localhost:5000");

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async user => {
    console.log("ofc");
    return await service.post("/signup", user);
  },
  logIn: async user => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },

  postResume: async resume => {
    return await service.post("/post-resume", resume);
  },
  postReward: async (reward, id) => {
    return await service.post(`/post-rewards/${id}`, reward);
  },

  postJob: async postJob => {
    return await service.post("/post-job", postJob);
  },
  showMyjobs: async id => {
    return await service.get(`/post-job/${id}`);
  },
  //   showHelpers: async() => {
  //     return await service.get('/job-helpers');
  //   },
  deleteMyJob: async id => {
    return await service.get(`/post-job/delete/${id}`);
  },
  addWorkExperience: async (workExp, resumeId) => {
    return await service.post(`/add_WE/${resumeId}`, workExp);
  },
  addSkill: async (skill, resumeId) => {
    return await service.post(`/add_Skill/${resumeId}`, skill);
  },
  addEducation: async (edu, resumeId) => {
    return await service.post(`/add_Education/${resumeId}`, edu);
  },
  searchByJobTitle: async searchParam => {
    return await service.get(`/user_search/jobTitle/${searchParam}`);
  },
  searchByJobTitle: async searchParam => {
    return await service.get(`/user_search/jobTitle/${searchParam}`);
  },
  deleteWE: async (resumeId, ind) => {
    return await service.post(`/delete_WE/${resumeId}`, ind);
  },
  deleteSkill: async (resumeId, ind) => {
    return await service.post(`/delete_Skill/${resumeId}`, ind);
  },
  deleteEdu: async (resumeId, ind) => {
    return await service.post(`/delete_Edu/${resumeId}`, ind);
  }
};

export default actions;
