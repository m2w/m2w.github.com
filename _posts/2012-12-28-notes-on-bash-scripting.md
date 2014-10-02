---
layout: post
title: Notes on bash scripting
tags: [bash, reference]
---
I recently skimmed through the
[Bash Guide](http://mywiki.wooledge.org/BashGuide/).
Some extracts for reference:

### Scripting Conventions

+ use `$( cmd )` instead of ``cmd``
+ use `exit` with an exit code > 0 to signal non-standard program termination
+ `{} < file` uses `file` for executing all statements inside the group
+ *always* use `[[` to test for equality
+ have a dedicated, version controlled directory for (bash) scripts where all scripts are symlinked and add it to `$PATH`

### Parameter expansion
{% highlight bash %}
${parameter:-word}  # Provide Default Value. If 'parameter' is unset or null, the expansion of 'word' is substituted. Otherwise, the value of 'parameter' is substituted.
${parameter:=word}  # Assign Default Value. If 'parameter' is unset or null, the expansion of 'word' is assigned to 'parameter'. The value of 'parameter' is then substituted.
${parameter:+word}  # Use Alternate Value. If 'parameter' is unset or null, nothing is substituted, otherwise the expansion of 'word' is substituted.
${parameter:offset:length}  # Substring Expansion. Expands to up to 'length' characters of 'parameter' starting at the character specified by 'offset' (0-indexed). If ':length' is omitted, go all the way to the end. If 'offset' is negative (use parentheses!), count backward from the end of 'parameter' instead of forward from the beginning.
${#parameter} # The length in characters of the value of 'parameter' is substituted.
${parameter#pattern}  # The 'pattern' is matched against the beginning of 'parameter'. The result is the expanded value of 'parameter' with the shortest match deleted.
${parameter##pattern} # As above, but the longest match is deleted.
${parameter%pattern}  # The 'pattern' is matched against the end of 'parameter'. The result is the expanded value of 'parameter' with the shortest match deleted.
${parameter%%pattern} # As above, but the longest match is deleted.
${parameter/pat/string}  # Results in the expanded value of 'parameter' with the first match of 'pat' replaced by 'string'.
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
-e <abbr>FILE</abbr> # True if file exists.
-f <abbr>FILE</abbr> # True if file is a regular file.
-d <abbr>FILE</abbr> # True if file is a directory.
-h <abbr>FILE</abbr> # True if file is a symbolic link.
-p <abbr>PIPE</abbr> # True if pipe exists.
-r <abbr>FILE</abbr> # True if file is readable by you.
-s <abbr>FILE</abbr> # True if file exists and is not empty.
-t FD   # True if FD is opened on a terminal.
-w <abbr>FILE</abbr> # True if the file is writable by you.
-x <abbr>FILE</abbr> # True if the file is executable by you.
-O <abbr>FILE</abbr> # True if the file is effectively owned by you.
-G <abbr>FILE</abbr> # True if the file is effectively owned by your group.
<abbr>FILE</abbr> -nt <abbr>FILE</abbr> # True if the first file is newer than the second.
<abbr>FILE</abbr> -ot <abbr>FILE</abbr> # True if the first file is older than the second.
-z <abbr>STRING</abbr> # True if the string is empty (it's length is zero).
-n <abbr>STRING</abbr> # True if the string is not empty (it's length is not zero).
<abbr>STRING</abbr> = <abbr>STRING</abbr>  # True if the first string is identical to the second.
<abbr>STRING</abbr> != <abbr>STRING</abbr> # True if the first string is not identical to the second.
<abbr>STRING</abbr> < <abbr>STRING</abbr>  # True if the first string sorts before the second.
<abbr>STRING</abbr> > <abbr>STRING</abbr>  # True if the first string sorts after the second.
<abbr>STRING</abbr> = (or ==) <abbr>PATTERN</abbr> # True if the string matches the glob pattern.
<abbr>STRING</abbr> =~ <abbr>REGEX</abbr> # True if the string matches the regex pattern.
<abbr>INT</abbr> -eq <abbr>INT</abbr> # True if both integers are identical.
<abbr>INT</abbr> -ne <abbr>INT</abbr> # True if the integers are not identical.
<abbr>INT</abbr> -lt <abbr>INT</abbr> # True if the first integer is less than the second.
<abbr>INT</abbr> -gt <abbr>INT</abbr> # True if the first integer is greater than the second.
<abbr>INT</abbr> -le <abbr>INT</abbr> # True if the first integer is less than or equal to the second.
<abbr>INT</abbr> -ge <abbr>INT</abbr> # True if the first integer is greater than or equal to the second.
<abbr>EXPR</abbr> -a <abbr>EXPR</abbr> # True if both expressions are true (logical AND).
<abbr>EXPR</abbr> -o <abbr>EXPR</abbr> # True if either expression is true (logical OR).
! <abbr>EXPR</abbr>   # Inverts the result of the expression (logical NOT).
( <abbr>EXPR</abbr> ) # Parentheses can be used to change the evaluation precedence.
<abbr>EXPR</abbr> && <abbr>EXPR</abbr> # Much like the '-a' operator of test, but with short-circuit logic.
<abbr>EXPR</abbr> || <abbr>EXPR</abbr> # Much like the '-o' operator of test, but with short-circuit logic.
{% endhighlight %}

### Misc

{% highlight bash %}. ./myscript # executes myscript in the current shell env (and can hence modify it!){% endhighlight %}
