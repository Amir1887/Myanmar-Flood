const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require("path");

const getFloodsRouter = require('./routes/floodRoutes/getFloodsRoute');
const postFloodsRouter = require('./routes/floodRoutes/postFloodsRoute');
const getUserRouter = require('./routes/userRoutes/getUserRoute');
const postUserRouter = require('./routes/userRoutes/postUserRoute');
const getDonationsRouter = require('./routes/dontationRoutes/getDonationsRoute');
const postDonationsRouter = require('./routes/dontationRoutes/postDonationsRoute');
const getAlertRouter = require('./routes/alertRoutes/getAlertRoute');
const postAlertRouter = require('./routes/alertRoutes/postAlertRoute');
const getCommuinityResRouter = require('./routes/commuinityResilienceRoutes/getCommuinityResRoute');
const postCommuinityResRouter = require('./routes/commuinityResilienceRoutes/postCommuinityResRoute');
const getHealthRouter = require('./routes/healthRoutes/getHealthRoute');
const postHealthRouter = require('./routes/healthRoutes/postHealthRoute');
const getResourcesRouter = require('./routes/resourceRoutes/getResourcesRoute');
const postResourcesRouter = require('./routes/resourceRoutes/postResourcesRoute');
const getOrganiztionRouter = require('./routes/organiztionRoutes/getOrganiztionRoute');
const postOrganiztionRouter = require('./routes/organiztionRoutes/postOrganiztionRoute');
const getDamageAssessmentRouter = require('./routes/damageAssessmentRoutes/getDamageAssessment');
const postDamageAssessmentRouter = require('./routes/damageAssessmentRoutes/postDamageAssessment');
const getOrganizationMemRouter = require('./routes/organizationMembersRoutes/getOrganizationMem');
const postOrganizationMemRouter = require('./routes/organizationMembersRoutes/postOrganizationMem');
const getDiseaseOutbreakRouteRouter = require('./routes/diseaseOutbreakRoute/getDiseaseOutbreakRoute');
const postDiseaseOutbreakRouteRouter = require('./routes/diseaseOutbreakRoute/postDiseaseOutbreakRoute');
const getApiLogRouter = require('./routes/apiLogRoutes/getApiLog');
const postApiLogRouter = require('./routes/apiLogRoutes/postApiLog');
const getHigherLevelOrgRouter = require('./routes/higherLevelOrg/getHigherLevelOrg');
const postHigherLevelOrgRouter = require('./routes/higherLevelOrg/postHigherLevelOrg');
const getDecisionMakerRouter = require('./routes/decisionMaker/getDecisionMaker');
const postDecisionMakerRouter = require('./routes/decisionMaker/postDecisionMaker');
const getEmergencyResponsePlanRouter = require('./routes/emergencyResponsePlan/getEmergencyResponsePlan');
const postEmergencyResponsePlanRouter = require('./routes/emergencyResponsePlan/postEmergencyResponsePlan');
const getFeedbackRouter = require('./routes/feedbackRoutes/getFeedback');
const postFeedbackRouter = require('./routes/feedbackRoutes/postFeedback');
const getHistoricalFloodDataRouter = require('./routes/historicalFloodData/getHistoricalFloodData');
const postHistoricalFloodDataRouter = require('./routes/historicalFloodData/postHistoricalFloodData');
const getMapDataRouter = require('./routes/MapDataRoutes/getMapData');
const postMapDataRouter = require('./routes/MapDataRoutes/postMapData');
const getOrderRouter = require('./routes/orderRoutes/getOrder');
const postOrderRouter = require('./routes/orderRoutes/postOrder');
const getOrganizationResponseRouter = require('./routes/organizationResponse/getOrganizationResponse');
const postOrganizationResponseRouter = require('./routes/organizationResponse/postOrganizationResponse');
const getSubmittedEmergencyRouter = require('./routes/submittedEmergency/getSubmittedEmergency');
const postSubmittedEmergencyRouter = require('./routes/submittedEmergency/postSubmittedEmergency');
const getReportRouter = require('./routes/reportRoutes/getReport');
const postReportRouter = require('./routes/reportRoutes/postReport');
const getTaskRouter = require('./routes/taskRoutes/getTask');
const postTaskRouter = require('./routes/taskRoutes/postTask');
const getVolunteerRouter = require('./routes/volunteerRoutes/getVolunteer');
const postVolunteerRouter = require('./routes/volunteerRoutes/postVolunteer');
const getVolunteerApplicationRouter = require('./routes/volunteerApplicationRoutes/getVolunteerApplication');
const postVolunteerApplicationRouter = require('./routes/volunteerApplicationRoutes/postVolunteerApplication');
const getUserConsentRouter = require('./routes/userConsentRoutes/getUserConsent');
const postUserConsentRouter = require('./routes/userConsentRoutes/postUserConsent');
const getUserPreferenceRouter = require('./routes/userPreference/getUserPreference');
const postUserPreferenceRouter = require('./routes/userPreference/postUserPreference');
const getVisualizationRouter = require('./routes/visualizationRoutes/getVisualization');
const postVisualizationRouter = require('./routes/visualizationRoutes/postVisualization');
const getWeatherDataRouter = require('./routes/weatherDataRoute/getWeatherData');
const postWeatherDataRouter = require('./routes/weatherDataRoute/postWeatherData');
const postcheckUserTypeRouter = require('./routes/checkUserType/postcheckUserType');
// const getGlofasRouter = require('./routes/glofasRoutes/getGlofas');
const getThenPostWeatherRouter = require('./routes/getWeatherRoutes/getThenPostWeather');
const postSubscriptionRouter = require('./routes/notificationSubscription/postSubscription');
const postPostsRouter = require('./routes/postRoutes/posts/postPosts');
const getPostsRouter = require('./routes/postRoutes/posts/getPosts');
const getCommentsRouter = require('./routes/postRoutes/commentsRoutes/getComments');
const postCommentsRouter = require('./routes/postRoutes/commentsRoutes/postComments');
const postLikesRouter = require('./routes/postRoutes/likesRoutes/postLikes');
const getLikesRouter = require('./routes/postRoutes/likesRoutes/getLikes');
const getBlogRouteRouter = require('./routes/blogPostRoutes/blogRoute');
const postMimuRoutesRouter = require('./routes/blogPostRoutes/routes/mimuRoutes');
const postMozelaRoutesRouter = require('./routes/blogPostRoutes/routes/mozelaRoutes');
const postreliefWebRoutessRouter = require('./routes/blogPostRoutes/routes/reliefWebRoutes');



const app = express();
const port = process.env.PORT || 4000;



// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

// Serve files in the "uploadedPosts" folder
app.use('/uploadedPosts', express.static(path.join(__dirname, '../uploadedPosts')));

// Increase the payload limit to handle larger requests
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', getFloodsRouter);
app.use('/', postFloodsRouter);
app.use('/', getUserRouter);
app.use('/', postUserRouter);
app.use('/', getDonationsRouter);
app.use('/', postDonationsRouter);
app.use('/', getAlertRouter);
app.use('/', postAlertRouter);
app.use('/', getCommuinityResRouter);
app.use('/', postCommuinityResRouter);
app.use('/', getHealthRouter);
app.use('/', postHealthRouter);
app.use('/', getResourcesRouter);
app.use('/', postResourcesRouter);
app.use('/', getOrganiztionRouter);
app.use('/', postOrganiztionRouter);
app.use('/', getDamageAssessmentRouter);
app.use('/', postDamageAssessmentRouter);
app.use('/', getOrganizationMemRouter);
app.use('/', postOrganizationMemRouter);
app.use('/', getDiseaseOutbreakRouteRouter);
app.use('/', postDiseaseOutbreakRouteRouter);
app.use('/', getApiLogRouter);
app.use('/', postApiLogRouter);
app.use('/', getHigherLevelOrgRouter);
app.use('/', postHigherLevelOrgRouter);
app.use('/', getDecisionMakerRouter);
app.use('/', postDecisionMakerRouter);
app.use('/', getEmergencyResponsePlanRouter);
app.use('/', postEmergencyResponsePlanRouter);
app.use('/', getFeedbackRouter);
app.use('/', postFeedbackRouter);
app.use('/', getHistoricalFloodDataRouter);
app.use('/', postHistoricalFloodDataRouter);
app.use('/', getMapDataRouter);
app.use('/', postMapDataRouter);
app.use('/', getOrderRouter);
app.use('/', postOrderRouter);
app.use('/', getOrganizationResponseRouter);
app.use('/', postOrganizationResponseRouter);
app.use('/', getSubmittedEmergencyRouter);
app.use('/', postSubmittedEmergencyRouter);
app.use('/', getReportRouter);
app.use('/', postReportRouter);
app.use('/', getTaskRouter);
app.use('/', postTaskRouter);
app.use('/', getVolunteerRouter);
app.use('/', postVolunteerRouter);
app.use('/', getVolunteerApplicationRouter);
app.use('/', postVolunteerApplicationRouter);
app.use('/', getUserConsentRouter);
app.use('/', postUserConsentRouter);
app.use('/', getUserPreferenceRouter);
app.use('/', postUserPreferenceRouter);
app.use('/', getVisualizationRouter);
app.use('/', postVisualizationRouter);
app.use('/', getWeatherDataRouter);
app.use('/', postWeatherDataRouter);
app.use('/', postcheckUserTypeRouter);
// app.use('/', getGlofasRouter);
app.use('/', getThenPostWeatherRouter);
app.use('/', postSubscriptionRouter);
app.use('/', getBlogRouteRouter);
app.use('/', postMimuRoutesRouter);
app.use('/', postMozelaRoutesRouter);
app.use('/', postreliefWebRoutessRouter);
app.use('/', postPostsRouter);
app.use('/', getPostsRouter);
app.use('/', getLikesRouter);
app.use('/', postLikesRouter);
app.use('/', postCommentsRouter);
app.use('/', getCommentsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });