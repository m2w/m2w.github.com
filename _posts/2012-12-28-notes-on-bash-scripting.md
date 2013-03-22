---
layout: post
title: Notes on bash scripting
tags: [bash]
---
I recently skimmed through the [Bash Guide](http://mywiki.wooledge.org/BashGuide/). What follows are a couple of hints extracted for reference:

### Conventions

+ use `$( cmd )` instead of ``cmd``
+ use `exit` with an exit code > 0 to signal non-standard programm termination
+ `{} < file` uses `file` for executing all statements inside the group
+ use `[[` to test for equality (ALWAYS!)
+ have a dedicated, version controlled directory for (bash) scripts where all scripts are symlinked and add it to the `$PATH`

### Parameter expansion
{% highlight bash %}
${parameter:-word}  # Use Default Value. If 'parameter' is unset or null, the expansion of 'word' is substituted. Otherwise, the value of 'parameter' is substituted.
${parameter:=word}  # Assign Default Value. If 'parameter' is unset or null, the expansion of 'word' is assigned to 'parameter'. The value of 'parameter' is then substituted.
${parameter:+word}  # Use Alternate Value. If 'parameter' is null or unset, nothing is substituted, otherwise the expansion of 'word' is substituted.
${parameter:offset:length}  # Substring Expansion. Expands to up to 'length' characters of 'parameter' starting at the character specified by 'offset' (0-indexed). If ':length' is omitted, go all the way to the end. If 'offset' is negative (use parentheses!), count backward from the end of 'parameter' instead of forward from the beginning.
${#parameter} # The length in characters of the value of 'parameter' is substituted.
${parameter#pattern}  # The 'pattern' is matched against the beginning of 'parameter'. The result is the expanded value of 'parameter' with the shortest match deleted.
${parameter##pattern} # As above, but the longest match is deleted.
${parameter%pattern}  # The 'pattern' is matched against the end of 'parameter'. The result is the expanded value of 'parameter' with the shortest match deleted.
${parameter%%pattern} # As above, but the longest match is deleted.
${parameter/pat/string}  # Results in the expanded value of 'parameter' with the first (unanchored) match of 'pat' replaced by 'string'.
${parameter//pat/string} # As above, but every match of 'pat' is replaced.
{% endhighlight %}

### Globbing

Enable extended globbing: `shopt -s extglob`
{% highlight bash %}
?(list): Matches zero or one occurrence of the given patterns.
*(list): Matches zero or more occurrences of the given patterns.
+(list): Matches one or more occurrences of the given patterns.
@(list): Matches one of the given patterns.
!(list): Matches anything except one of the given patterns.
{% endhighlight %}

Globbing can be used in case statements
{% highlight bash %}
case $input in
    1) echo 1
    2*0) echo "starts with 2 and ends with 0"
    *) echo other
esac
{% endhighlight %}

### Truthiness

{% highlight bash %}
-e FILE # True if file exists.
-f FILE # True if file is a regular file.
-d FILE # True if file is a directory.
-h FILE # True if file is a symbolic link.
-p PIPE # True if pipe exists.
-r FILE # True if file is readable by you.
-s FILE # True if file exists and is not empty.
-t FD   # True if FD is opened on a terminal.
-w FILE # True if the file is writable by you.
-x FILE # True if the file is executable by you.
-O FILE # True if the file is effectively owned by you.
-G FILE # True if the file is effectively owned by your group.
FILE -nt FILE # True if the first file is newer than the second.
FILE -ot FILE # True if the first file is older than the second.
-z STRING # True if the string is empty (it's length is zero).
-n STRING # True if the string is not empty (it's length is not zero).
STRING = STRING  # True if the first string is identical to the second.
STRING != STRING # True if the first string is not identical to the second.
STRING < STRING  # True if the first string sorts before the second.
STRING > STRING  # True if the first string sorts after the second.
EXPR -a EXPR # True if both expressions are true (logical AND).
EXPR -o EXPR # True if either expression is true (logical OR).
! EXPR # Inverts the result of the expression (logical NOT).
INT -eq INT # True if both integers are identical.
INT -ne INT # True if the integers are not identical.
INT -lt INT # True if the first integer is less than the second.
INT -gt INT # True if the first integer is greater than the second.
INT -le INT # True if the first integer is less than or equal to the second.
INT -ge INT # True if the first integer is greater than or equal to the second.
STRING = (or ==) PATTERN # Not string comparison like with [ (or test), but pattern matching is performed. True if the string matches the glob pattern.
STRING =~ REGEX # True if the string matches the regex pattern.
( EXPR ) # Parantheses can be used to change the evaluation precedence.
EXPR && EXPR # Much like the '-a' operator of test, but does not evaluate the second expression if the first already turns out to be false.
EXPR || EXPR # Much like the '-o' operator of test, but does not evaluate the second expression if the first already turns out to be true.
{% endhighlight %}

### Misc

{% highlight bash %}. ./myscript # executes myscript in the current shell env! (and can hence modify it!){% endhighlight %}