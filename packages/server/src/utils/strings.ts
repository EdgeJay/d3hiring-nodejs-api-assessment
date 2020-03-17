/**
 * Extract mentions from text, and mentions must be email addresses with "@" in front.
 * Returns mentions in array of strings
 *
 * @param text Message containing mentions
 * @param excludeAt Remove "@" prefix in front of email addresses if true.
 */
export const extractEmailMentions = (text = '', excludeAt = true): string[] => {
  const regex = /@\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}/gi;
  const mentions = (text.match(regex) || []) as string[];
  if (excludeAt) {
    return mentions.map(mention => mention.substring(1));
  }
  return mentions;
};
