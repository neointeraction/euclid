import axios from "axios";
import { baseUrl, SUCCESS } from "./constants";

export function getHeaders() {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        userId: localStorage.getItem('userId')
    };
}

export function getPaperSnippets(successCallback) {
    axios({
        url: baseUrl + "contributor/get_publication",
        method: "POST",
        headers: getHeaders()
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function setInvalidSnippet(data, successCallback) {
    axios({
        url: baseUrl + "contributor/set_invalid",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback();
        })
        .catch((error) => {
            console.log(error);
        });
}

export function addEvidence(data, successCallback) {
    axios({
        url: baseUrl + "contributor/add_evidence",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getContext(successCallback) {
    axios({
        url: baseUrl + "contributor/get_context",
        method: "POST",
        headers: getHeaders()
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getContextValues(contextValue, pagination, successCallback) {
    axios({
        url: baseUrl + "contributor/get_context_value",
        method: "POST",
        headers: getHeaders(),
        data: { context: contextValue, ...pagination }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function saveTriples(data, successCallback) {
    axios({
        url: baseUrl + "contributor/save_draft",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function commitTriples(data, successCallback, errorCallback) {
    axios({
        url: baseUrl + "contributor/commit",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) {
                successCallback(response.data.message);
            } else {
                errorCallback(response.data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getTripleStatuses(successCallback) {
    axios({
        url: baseUrl + "reviewer/get_number_triples_statuses",
        method: "POST",
        headers: getHeaders()
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getRecentHistory(successCallback) {
    axios({
        url: baseUrl + "reviewer/get_recent_history",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getFullHistory(data, successCallback) {
    axios({
        url: baseUrl + "reviewer/get_full_history",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getEvidence(pubId, successCallback) {
    axios({
        url: baseUrl + "reviewer/get_evidence",
        method: "POST",
        headers: getHeaders(),
        data: { pubid: pubId }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getAdminEvidence(pubId, successCallback) {
    axios({
        url: baseUrl + "admin/get_evidence",
        method: "POST",
        headers: getHeaders(),
        data: { pubid: pubId }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getEntityWithType(data, successCallback) {
    axios({
        url: baseUrl + "contributor/get_entity",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getEntityWithOutType(data, successCallback) {
    axios({
        url: baseUrl + "contributor/get_entity",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getEntityRight(entityType, successCallback) {
    axios({
        url: baseUrl + "contributor/get_next_right",
        method: "POST",
        headers: getHeaders(),
        data: { "ent_type": entityType }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getEntityLeft(entityType, successCallback) {
    axios({
        url: baseUrl + "contributor/get_next_left",
        method: "POST",
        headers: getHeaders(),
        data: { "ent_type": entityType }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getRelations(successCallback) {
    axios({
        url: baseUrl + "contributor/get_relations",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSavedData(pubId, successCallback) {
    axios({
        url: baseUrl + "contributor/get_draft",
        method: "POST",
        headers: getHeaders(),
        data: { "pubid": pubId }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}


export function validateEvidence(data, successCallback) {
    axios({
        url: baseUrl + "reviewer/set_valid_evidence",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function deleteEvidence(data, successCallback) {
    axios({
        url: baseUrl + "reviewer/delete_evidence",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function approveTriple(data, successCallback) {
    axios({
        url: baseUrl + "reviewer/approve_triple",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function forwardTripleToAdmin(data, successCallback) {
    axios({
        url: baseUrl + "reviewer/forward_to_admin",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getDashboardDetails(successCallback) {
    axios({
        url: baseUrl + "admin/get_dashboard_details",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getUserDetails(successCallback) {
    axios({
        url: baseUrl + "admin/get_users",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerDetails(successCallback) {
    axios({
        url: baseUrl + "admin/get_customers'",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getTriplesFlagged(successCallback) {
    axios({
        url: baseUrl + "admin/get_dashboard_triples_flagged",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getPerformanceOverView(successCallback) {
    axios({
        url: baseUrl + "admin/get_dashboard_performance_overview_evidences",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getDraft(pubId, successCallback) {
    axios({
        url: baseUrl + "contributor/get_draft",
        method: "POST",
        headers: getHeaders(),
        data: { pubid: pubId }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function fixOrCloseTriple(data, successCallback) {
    axios({
        url: baseUrl + "admin/fixed",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerDashboardDetails(successCallback) {
    axios({
        url: baseUrl + "customer/get_dashboard_details",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getLastSearchDetails(successCallback) {
    axios({
        url: baseUrl + "customer/get_last_search",
        method: "POST",
        headers: getHeaders(),
        data: { last: "6" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getLastPurchaseDetails(successCallback) {
    axios({
        url: baseUrl + "customer/get_last_purchase",
        method: "POST",
        headers: getHeaders(),
        data: { last: "6" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCompletePurchaseDetails(successCallback) {
    axios({
        url: baseUrl + "customer/get_detailed_purchase",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCompleteSearchDetails(successCallback) {
    axios({
        url: baseUrl + "customer/get_detailed_search",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCartItems(successCallback) {
    axios({
        url: baseUrl + "customer/get_cart_items",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerContext(successCallback) {
    axios({
        url: baseUrl + "customer/get_context",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerContextValues(value, successCallback) {
    axios({
        url: baseUrl + "customer/get_context_value",
        method: "POST",
        headers: getHeaders(),
        data: { context: value, page_num: "0", page_size: "10", prefix: "" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerEntities(value, successCallback) {
    axios({
        url: baseUrl + "customer/get_entity",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10", ent_types: [value], prefix: "" }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerEntityTypes(successCallback) {
    axios({
        url: baseUrl + "customer/get_all_entity_types",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function searchTriples(data, successCallback) {
    axios({
        url: baseUrl + "customer/search",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSatisfaction(successCallback) {
    axios({
        url: baseUrl + "contributor/get_satisfaction",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getContributorDashboardDetails(successCallback) {
    axios({
        url: baseUrl + "contributor/get_dashboard_details",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getRecentContributorHistory(successCallback) {
    axios({
        url: baseUrl + "contributor/get_recent_history",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getPoints(successCallback) {
    axios({
        url: baseUrl + "contributor/get_points",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getCompleteContributorHistory(status, successCallback) {
    axios({
        url: baseUrl + "contributor/get_full_history",
        method: "POST",
        headers: getHeaders(),
        data: { page_num: "0", page_size: "10", status }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getContributorHistogram(data, successCallback) {
    axios({
        url: baseUrl + "contributor/get_histogram",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getAdminHistogram(data, successCallback) {
    axios({
        url: baseUrl + "admin/get_histogram",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerRealTimeGraph(successCallback) {
    axios({
        url: baseUrl + "customer/get_realtime_data",
        method: "POST",
        headers: getHeaders(),
        data: { last: 12 }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCustomerHistogram(data, successCallback) {
    axios({
        url: baseUrl + "customer/get_histogram",
        method: "POST",
        headers: getHeaders(),
        data
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getTop10EntitiesGraph(successCallback) {
    axios({
        url: baseUrl + "customer/top_entities",
        method: "POST",
        headers: getHeaders(),
        data: { last: 10 }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getDonutChart(successCallback) {
    axios({
        url: baseUrl + "customer/entity_donut",
        method: "POST",
        headers: getHeaders(),
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getTriplesAndEvidencesGraph(successCallback) {
    axios({
        url: baseUrl + "customer/evidence_triple_histogram",
        method: "POST",
        headers: getHeaders(),
        data: { last: 10 }
    })
        .then((response) => {
            if (response.data.result === SUCCESS) successCallback(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        });
}