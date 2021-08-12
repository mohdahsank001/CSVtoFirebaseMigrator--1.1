/** @format */

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const dataJob = require("./testJob.json").map((job) => {
  return {
    adminApproved: true,
    approvedBefore: true,
    balance: 0,
    city: "New South Wales", //no data
    commission: [],
    currency: "aud", //no data
    employerID: "", //handle in import state
    industryExperience: [],
    jobDescHTML: {
      html: "<p>" + job.jobDescription + "</p>",
    },
    jobTitle: job.jobTitle,
    jobType: {
      //need to use form of all jobtype from standalone code base for this to match the value
      label: "Part Time",
      longSalaryText: "Per Hour",
      postJobSalaryText: "Hourly Rate",
      searchJobSalaryText: "Per Hour",
      value: "partTime",
    },
    jobID: "", //handle in import state
    leadsFileList: [],
    location: {
      //fixed one
      country: { long: "United States", shortCode: "US" },
      formattedAddress: "Los Angeles, CA, USA",
      googlePlacesObj: true,
      name: "Los Angeles",
      placeID: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
      searchString: "Los Angeles, CA, USA",
      state: "California",
      types: ["locality", "political"],
    },
    maxPay: 3500, //no data
    minPay: 3000, //no data
    hourlyRate: 2000, //no data
    onTargetEarnings: 0,
    paymentMode: "partTime", //fixed one
    profileImgUrl: job.jobImageUrl,
    publishedDate: new Date(),
    referralJobTitles: "",
    qualifyingQuestions: [],
    salaryOption: "hourly", //fixed one
    saleSkills: [],
    salespeople: [],
    salesTarget: [],
    seoFriendlyUrl: "", //handle in import state
    specialCountryQuery: { label: "Australia", value: "AU" }, //fixed one
    status: "published",
    totalApplicants: job.applicantsCount,
    totalNewApplicants: 0,
    visible: true,
    workLocationType: {
      //fixed one
      label: "Remote (Work From Home)",
      value: "remote",
    },
  };
});
const dataUser = require("./testUser.json").map((user) => {
  return {
    isDone: true,
    accountStatus: user.accountStatus,
    companyName: user.companyName,
    country: user.country,
    countryCode: user.countryCode,
    desiredAnnualSalary: user.desiredAnnualSalary[0].integer,
    email: user.email,
    firstName: user.firstName[0],
    lastName: user.lastName,
    name: user.name,
    phone: "",
    priority: 1,
    profileCreatedDate: new Date(),
    rating: 0,
    reviews: [],
    selectedWorkPreference: user.selectedWorkPreference,
    selectedWorkSituation: user.selectedWorkSituation,
    seoFriendlyUrl: user.seoFriendlyUrl,
    signUpCompleted: true,
    signUpReason: {
      label: "",
      value: "",
    },
    timezone: {
      label: "",
      value: "",
    },
    userID: user.userID,
    userType: "employer",
    verified: false,
    visible: false,
    welcomeEmailSent: true,
  };
});
const data = dataUser;
const collectionKey = "users"; //name of the collection
const collectionJob = "jobs";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sales-guns-v2.firebaseio.com", // Get it from the Firebase Admin SDK.
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && typeof data === "object") {
  Object.keys(data).forEach((v, i, docKey) => {
    const user = firestore.collection(collectionKey);
    const userDoc = user.doc();
    const { _path } = userDoc;
    const { segments } = _path;
    const newUserID = segments[1];
    data[docKey].userID = newUserID;
    userDoc
      .set(data[docKey])
      .then((res) => {
        const jobDoc = userDoc.collection(collectionJob).doc();
        const time = admin.firestore.FieldValue.serverTimestamp();
        dataJob[i].createdDate = time;
        dataJob[i].lastEdited = time;
        dataJob[i].publishedDate = time;
        dataJob[i].employerID = newUserID;
        dataJob[i].seoFriendlyUrl = dataJob[i].jobTitle
          .toLowerCase()
          .split(" ")
          .join("_");
        const { _path } = jobDoc;
        const { segments } = _path;
        const newJobID = segments[3];
        dataJob[i].jobID = newJobID;
        jobDoc.set(dataJob[i]);

        console.log(newUserID);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}
