#! /usr/local/bin/perl -w

use strict;
require 'config.pl';
require 'flplus.pl';

MAIN: {
    Login();
    print HandleList();
    exit 0;
}

