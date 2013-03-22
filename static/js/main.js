// TODO: add a github commit comment based commenting system
// The general idea is to have one commit per blog post / page
// Only display existing comments, with a link to comment on the commit via github

// Rough Mechanic:
// 1. Grab all commit comments
// 2. Grab the permalink of the post - which can be converted to the actual file
// 3. Extract all comments that deal with said file
// 4. Display the count on the index, display the comment contents on the permalink page

// If this is too slow, drop index support - generate the comment count statically each time a new post gets added