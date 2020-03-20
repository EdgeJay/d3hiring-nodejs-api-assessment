/**
 * Removes duplicates from array of strings
 *
 * @param list Array of strings
 */
export const removeDuplicates = (list: string[]): string[] => {
  const uniqueList: string[] = [];
  const newList = list.filter(item => {
    if (!uniqueList.includes(item)) {
      uniqueList.push(item);
      return true;
    }
    return false;
  });
  return newList;
};

/**
 * Extract mentions from text, and mentions must be email addresses with "@" in front.
 * Returns mentions in array of strings
 *
 * @param text Message containing mentions
 * @param excludeAt Remove "@" prefix in front of email addresses if true.
 */
export const extractEmailMentions = (text = '', excludeAt = true): string[] => {
  const regex = /@\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}/gi;

  // extract mentions using regex
  let mentions = (text.match(regex) || []) as string[];

  // remove "@" prefix if required
  if (excludeAt) {
    mentions = mentions.map(mention => mention.substring(1));
  }

  // remove duplicates
  mentions = removeDuplicates(mentions);

  return mentions;
};
