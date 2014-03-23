#!/usr/bin/perl -w
@array1 = ("hello","world");
@array2 = @array1;
($str1,$str2) = @array2;

print $str1, "\n";
print $str2, "\n";
