#!/usr/bin/perl

$logfile = './iplogs.dat.cgi';
$domain = $ENV{'SERVER_NAME'};

$uri = '//' . $ENV{'SERVER_NAME'} . $ENV{'SCRIPT_NAME'};

## File Size Limit Bytes / 1MB = 1048576 Byte
$maxfilesize = 1048576;

($sec,$min,$hour,$day,$mon,$year) = localtime(time);
$year += 1900;$mon++;
$stmp = sprintf("%04d-%02d-%02d %02d:%02d:%02d",$year,$mon,$day,$hour,$min,$sec);
$today = sprintf("%04d-%02d-%02d",$year,$mon,$day);

$yesterday = time - (60*60*24);
($sec,$min,$hour,$day,$mon,$year) = localtime($yesterday);
$yesterday = sprintf("%04d-%02d-%02d",$year += 1900,$mon+1,$day);

if($ENV{'QUERY_STRING'} && index($ENV{'HTTP_REFERER'},$domain) > -1){
	@log = ($stmp,$ENV{'REMOTE_ADDR'},$ENV{'QUERY_STRING'});
	if((-s $logfile) > $maxfilesize && ($maxfilesize)){
		@iplogs = &_LOAD($logfile);
		@today = grep(/^${today}/,@iplogs);
		@yesterday = grep(/^${yesterday}/,@iplogs);
		@iplogs = (@yesterday,@today);
		push @iplogs,join("\t",@log);
		&_SAVE($logfile,join("\n",@iplogs));
	}
	else {
		&_ADDSAVE($logfile,join("\t",@log));
	}
	open(IMG,"iplogs.img.gif");
	$byte = -s "iplogs.img.gif";
	print "Content-type: image/gif\n";
	print "Content-length: $byte\n\n";
	print <IMG>;
	close(IMG);
}
else {
	print "Pragma: no-cache\n";
	print "Cache-Control: no-cache\n";
	print "Content-type: text/plain; charset=UTF-8\n\n";
	print "if(document.referrer) document.write('<img src=\"${uri}?'+document.referrer+'\" />');";
}
exit;
sub _ADDSAVE {
	my($path,$str) = @_;
	chmod 0777,$path;
	flock(FH, LOCK_EX);
		open(FH,">>${path}");
			print FH $str . "\n";
		close(FH);
	flock(FH, LOCK_NB);
	chmod 0600,$path;
}
sub _LOAD {
	my($path) = @_;
	my(@loader) = ();
	flock(FH, LOCK_EX);
		open(FH,$path);
			@loader = <FH>;
		close(FH);
	flock(FH, LOCK_NB);
	$loader = join('',@loader);
	$loader =~ s/\r//ig;
	@loader = split(/\n/,$loader);
	return @loader;
}
sub _SAVE {
	my($path,$str) = @_;
	chmod 0777,$path;
	flock(FH, LOCK_EX);
		open(FH,">${path}");
			print FH $str;
		close(FH);
	flock(FH, LOCK_NB);
	chmod 0600,$path;
}
