// 方法A: TwitterWebServiceを使った認証およびコールバック: Start ----------------------------------------------
// 方法Aの日本語アカウント用: Start ----------------------------------------
// //認証用インスタンスの生成
// const twitter = TwitterWebService.getInstance(
//   apiKeyTwitterAccountJp, //API Key
//   apiKeySecretTwitterAccountJp //API secret key
// );

// //アプリを連携認証する
// function authorize() {
//   twitter.authorize();
// }
 
// //認証を解除する
// function reset() {
//   twitter.reset();
// }
 
// //認証後のコールバック
// function authCallback(request) {
//   return twitter.authCallback(request);
// }
// 方法Aの日本語アカウント用: End ----------------------------------------
// 方法Aの英語アカウント用: Start ----------------------------------------
// //認証用インスタンスの生成
// const twitter = TwitterWebService.getInstance(
//   apiKeyTwitterAccountEn, //API Key
//   apiKeySecretTwitterAccountEn //API secret key
// );

// //アプリを連携認証する
// function authorize() {
//   twitter.authorize();
// }
 
// //認証を解除する
// function reset() {
//   twitter.reset();
// }
 
// //認証後のコールバック
// function authCallback(request) {
//   return twitter.authCallback(request);
// }
// 方法Aの英語アカウント用: End ----------------------------------------
// 方法A: TwitterWebServiceを使った認証およびコールバック: End ----------------------------------------------

// 方法B: OAuth1.createServiceを使った認証およびコールバック: Start ----------------------------------------------
// 方法Bの日本語アカウント用: Start ----------------------------------------
// function getTwitterServiceJp() {
//   // Create a new service with the given name. The name will be used when
//   // persisting the authorized token, so ensure it is unique within the
//   // scope of the property store.
//   return OAuth1.createService('twitter')
//     // Set the endpoint URLs.
//     .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
//     .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
//     .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
//     // Set the consumer key and secret.
//     .setConsumerKey(apiKeyTwitterAccountJp)
//     .setConsumerSecret(apiKeySecretTwitterAccountJp)
//     // Set the name of the callback function in the script referenced
//     // above that should be invoked to complete the OAuth flow.
//     .setCallbackFunction('authCallback')
//     // Set the property store where authorized tokens should be persisted.
//     .setPropertyStore(PropertiesService.getUserProperties());
// }
function getTwitterServiceJp() {
  return OAuth1.createService("Twitter")
    .setAccessTokenUrl("https://api.twitter.com/oauth/access_token")
    .setRequestTokenUrl("https://api.twitter.com/oauth/request_token")
    .setAuthorizationUrl("https://api.twitter.com/oauth/authorize")
    .setConsumerKey(API_KEY_TWITTER_ACCOUNT_JP)
    .setConsumerSecret(API_KEY_SECRET_TWITTER_ACCOUNT_JP)
    .setAccessToken(ACCESS_TOKEN_TWITTER_ACCOUNT_JP, ACCESS_TOKEN_SECRET_TWITTER_ACCOUNT_JP);
};
function showSidebarToAuthJp() {
  let twitterService = getTwitterServiceJp();
  if (!twitterService.hasAccess()) {
    let authorizationUrl = twitterService.authorize();
    let template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    let page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
    // 
  }
}
function authCallbackJp(request) {
  let twitterService = getTwitterServiceJp();
  let isAuthorized = twitterService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
// 方法Bの日本語アカウント用: End ----------------------------------------

// 方法Bの英語アカウント用: Start ----------------------------------------
// function getTwitterServiceEn() {
//   // Create a new service with the given name. The name will be used when
//   // persisting the authorized token, so ensure it is unique within the
//   // scope of the property store.
//   return OAuth1.createService('twitter')
//     // Set the endpoint URLs.
//     .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
//     .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
//     .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
//     // Set the consumer key and secret.
//     .setConsumerKey(apiKeyTwitterAccountEn)
//     .setConsumerSecret(apiKeySecretTwitterAccountEn)
//     // Set the name of the callback function in the script referenced
//     // above that should be invoked to complete the OAuth flow.
//     .setCallbackFunction('authCallback')
//     // Set the property store where authorized tokens should be persisted.
//     .setPropertyStore(PropertiesService.getUserProperties());
// }
function getTwitterServiceEn() {
  return OAuth1.createService("Twitter")
    .setAccessTokenUrl("https://api.twitter.com/oauth/access_token")
    .setRequestTokenUrl("https://api.twitter.com/oauth/request_token")
    .setAuthorizationUrl("https://api.twitter.com/oauth/authorize")
    .setConsumerKey(API_KEY_TWITTER_ACCOUNT_EN)
    .setConsumerSecret(API_KEY_SECRET_TWITTER_ACCOUNT_EN)
    .setAccessToken(ACCESS_TOKEN_TWITTER_ACCOUNT_EN, ACCESS_TOKEN_SECRET_TWITTER_ACCOUNT_EN);
};
function showSidebarToAuthEn() {
  let twitterService = getTwitterServiceEn();
  if (!twitterService.hasAccess()) {
    let authorizationUrl = twitterService.authorize();
    let template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    let page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
    // 
  }
}
function authCallbackEn(request) {
  let twitterService = getTwitterServiceEn();
  let isAuthorized = twitterService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
// 方法Bの英語アカウント用: End ----------------------------------------
// 方法B: OAuth1.createServiceを使った認証およびコールバック: End ----------------------------------------------

function postTweet(sentence, language) {
  // const service = twitter.getService(); // 方法Aによるサービス
  let service;
  let bearerTokenTwitterAccount;
  if(language === 'JP'){
    service = getTwitterServiceJp(); // 方法Bによるサービス
    bearerTokenTwitterAccount = BEARER_TOKEN_TWITTER_ACCOUNT_JP;
  }else if(language === 'EN'){
    service = getTwitterServiceEn(); // 方法Bによるサービス
    bearerTokenTwitterAccount = BEARER_TOKEN_TWITTER_ACCOUNT_EN;
  }
  
  const endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
  const options = {
    'method': 'post',
    // 'headers' : {Authorization: 'Bearer ' + bearerTokenTwitterAccount},
    // "muteHttpExceptions" : true,
    "payload": {
      status: sentence
    }
  }
  try {
    let response = service.fetch(endPointUrl, options);
    console.log(response);
  } catch(e) {
    // 例外エラー処理
    console.log('Error:')
    console.log(e)
  }
}

function decideSentenceToTweet(wordArray, language){
  const funcName = 'decideSentenceToTweet';
  let sentenceToTweet = ''

  if(wordArray.length === 1){
    sentenceToTweet = wordArray[0];
    console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('a')}: `);
    return sentenceToTweet;
  }
  if(language === 'JP'){
    sentenceToTweet = `${wordArray[0]}・${wordArray[1]}`;
  }
  if(language === 'EN'){
    sentenceToTweet = `${wordArray[0]} ${wordArray[1]}`;
  }
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('b')}: `);
  console.log(`sentenceToTweet: ${sentenceToTweet}`);
  return sentenceToTweet;
}

function selectRowAtRandom(amountOfRow, offsetAmountOfRow){
  let randomFloat = 0;
  while(randomFloat === 0){
    randomFloat = Math.random();
  }
  return Math.floor(randomFloat * (amountOfRow)) + offsetAmountOfRow;
}

function selectWordsToTweet(language) {
  const funcName = 'selectWordsToTweet';
  const defaultRatio = 0.3;
  const irregularRatio = 0.2;
  let   isIrregular = false;

  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet       = spreadsheet.getSheetByName(sheetNameDisseminating1st);
  let irregularIndex;
  let amountOfWords;
  let selectedRow;
  let wordArrayToTweet = [];

  // decide regular or irregular.
  irregularIndex = Math.random();
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('a')}: irregularIndex is ${irregularIndex}`);

  if(irregularIndex < irregularRatio){
    isIrregular = true;
  }
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('b')}: isIrregular is ${isIrregular}`);

  if(isIrregular === true){
    // irregular process.
    let cell_amount_of_word_language;
    let column_word_language;
    if(language === 'JP'){
      cell_amount_of_word_language = cell_amount_of_word_jp_for_irregular_1st;
      column_word_language = column_word_jp_for_irregular_1st;
    }
    if(language === 'EN'){
      cell_amount_of_word_language = cell_amount_of_word_en_for_irregular_1st;
      column_word_language = column_word_en_for_irregular_1st;
    }
    amountOfWords = Number(sheet.getRange(cell_amount_of_word_language).getValue());
    selectedRow   = selectRowAtRandom(amountOfWords, row_start_of_word_list);
    const irregularWord = String(sheet.getRange(selectedRow, column_word_language, 1, 1).getValue());
    console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('c')}: irregularWord is ${irregularWord}`);
    
    wordArrayToTweet.push(irregularWord);
    console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('d')}: `);
    console.log(wordArrayToTweet);
    return wordArrayToTweet;
  }
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('e')}: `);

  // regular process.
  let cell_amount_of_word_cardinal,
    column_word_cardinal,
    cell_amount_of_word_george,
    column_word_george;
  if(language === 'JP'){
    cell_amount_of_word_cardinal = String(cell_amount_of_word_jp_for_cardinal_1st);
    column_word_cardinal         = Number(column_word_jp_for_cardinal_1st);
    cell_amount_of_word_george   = String(cell_amount_of_word_jp_for_george_1st);
    column_word_george           = Number(column_word_jp_for_george_1st);
  }
  if(language === 'EN'){
    cell_amount_of_word_cardinal = String(cell_amount_of_word_en_for_cardinal_1st);
    column_word_cardinal         = Number(column_word_en_for_cardinal_1st);
    cell_amount_of_word_george   = String(cell_amount_of_word_en_for_george_1st);
    column_word_george           = Number(column_word_en_for_george_1st);
  }
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('e')}: `);
  console.log(`cell_amount_of_word_cardinal: ${cell_amount_of_word_cardinal}`);
  console.log(`column_word_cardinal: ${column_word_cardinal}`);
  console.log(`cell_amount_of_word_george: ${cell_amount_of_word_george}`);
  console.log(`column_word_george: ${column_word_george}`);

  const amountOfWordsCardinal = Number(sheet.getRange(cell_amount_of_word_cardinal).getValue());
  selectedRow        = selectRowAtRandom(amountOfWordsCardinal, row_start_of_word_list);
  const wordCardinal = String(sheet.getRange(selectedRow, column_word_cardinal, 1, 1).getValue());
  const amountOfWordsGeorge = Number(sheet.getRange(cell_amount_of_word_george).getValue());
  selectedRow        = selectRowAtRandom(amountOfWordsGeorge, row_start_of_word_list);
  const wordGeorge   = String(sheet.getRange(selectedRow, column_word_george, 1, 1).getValue());
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('e')}: `);
  console.log(`amountOfWordsCardinal: ${amountOfWordsCardinal}`);
  console.log(`wordCardinal: ${wordCardinal}`);
  console.log(`amountOfWordsGeorge: ${amountOfWordsGeorge}`);
  console.log(`wordGeorge: ${wordGeorge}`);

  wordArrayToTweet = [wordCardinal, wordGeorge];
  console.log(`${funcName}: ${LandmasterLibraryGas.getStrRepeatedToMark('f')}: `);
  console.log(wordArrayToTweet)
  return wordArrayToTweet;
}

function main() {
  // Japanese mode.
  let wordArray = selectWordsToTweet('JP');
  let sentence  = decideSentenceToTweet(wordArray, 'JP');
  postTweet(sentence, 'JP');

  // English mode.
  wordArray = selectWordsToTweet('EN');
  sentence  = decideSentenceToTweet(wordArray, 'EN');
  postTweet(sentence, 'EN');

}
