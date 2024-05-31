const LOG_TYPE = {
    CREATE:1,
    UPDATE:2,
    DELETE:3,
    DOWNLOAD:4,
    UPLOAD:5,
};

const LOG_CATEGORY = {
    TABLES:1,
    USER:2,
}

const ACCOUNT_STATUS = {
    PENDING:1,
    ACTIVE:2,
    INACTIVE:3,
}



const DAY_VALUE = 60 * 60 * 24 * 1000;

module.exports = {
    LOG_TYPE,
    LOG_CATEGORY,
    ACCOUNT_STATUS,
    DAY_VALUE,
}