import ReactGA4 from "react-ga4";
//import { TRACKING_ID } from "../from_somewhere"; //don't forget to put it in env tho

const InitializeGoogleAnalytics = () => {
  const tracking_id = "G-LN6WEDET43";
  ReactGA4.initialize(tracking_id);
  console.log("GA INITIALIZED");
};

const TrackGoogleAnalyticsEvent = (category, action) => {
  console.log("GA event = ", "category :", category, ":", "action :", action);

  ReactGA4.event({
    category: category,
    action: action,
  });
};

export default InitializeGoogleAnalytics;
export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };
