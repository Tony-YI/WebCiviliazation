#!/usr/bin/perl -w
@array = ("say", "hello", "world", "together");
print '@array: ', "@array\n";
print '@array[0,1]: ', "@array[0,1]\n";
print '@array[0,2]: ', "@array[0,2]\n";
print '@array[1,2]: ', "@array[1,2]\n";
print '@array[3,2,1,0]: ', "@array[3,2,1,0]\n";
print '@array[0..1]: ', "@array[0..1]\n";
print '@array[0..2]: ', "@array[0..2]\n";
print '@array[1..3]: ', "@array[1..3]\n";

