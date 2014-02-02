#!/usr/bin/perl -w
$hash{"a"} = "say";
$hash{"b"} = "hello";
$hash{"c"} = "world";
$hash{"d"} = "together";

@temp = keys(%hash);
print "keys: @temp\n";

@temp = values(%hash);
print "values: @temp\n";

foreach $i (keys(%hash))
{
	print "$i $hash{$i}\n";
}
