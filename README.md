# TweetBotCardinalGeorge

<img width="50%" alt="Cardinal George" src="./img/01-01_outline.jpg">

# Table of Contents

- [TweetBotCardinalGeorge](#tweetbotcardinalgeorge)
- [Table of Contents](#table-of-contents)
- [What are Functions](#what-are-functions)
  - [`selectWordsToTweet`](#selectwordstotweet)
  - [`decideSentenceToTweet`](#decidesentencetotweet)
  - [`postTweet`](#posttweet)
- [Operation](#operation)

# What are Functions

This bot tweets with contents in the spreadsheet at random.

<img width="50%" alt="" src="./img/02-01_function.jpg">

Tweets in Japanese.

<img width="50%" alt="Bot tweets at random in Japanese." src="./img/02-02_tweet_jp.jpg">

Tweets in English.

<img width="50%" alt="Bot tweets at random in English" src="./img/02-03_tweet_en.jpg">

## `selectWordsToTweet`

Selects words to tweet from spreadsheet.

Words can be following pattern (in the case of Japanese).

- `B` column and `D` column.
- `F` column only.

<img width="50%" alt="Bot selects words from specific columns." src="./img/03-01_selectWordsToTweet.jpg">

## `decideSentenceToTweet`

Decides sentence to tweet from array that contains words.

## `postTweet`

Tweets in Japanese or English.

# Operation

After you execute `main` function, this bot tweets with words at random.
