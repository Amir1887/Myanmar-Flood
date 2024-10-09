const express = require('express');
const cors = require('cors');
require('dotenv').config();


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



const app = express();
const port = process.env.PORT || 4000;



// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });