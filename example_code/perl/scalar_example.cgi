#!/usr/bin/perl -w
$var1 = "123";
$var2 = 123;
#{} are used to quote the begining and the ending
#of the variable/scalar name
$var3 = "${var1}456";
$var4 = '${var1}456';


print "var1 = $var1\n";
print "var2 = $var2\n";
print "var3 = $var3\n";
print "var4 = $var4\n";
