#!/bin/bash
pw="Tlxd1134"
command1="ssh -l root 120.27.26.189"
copy1="scp -r ./web root@120.27.26.189:/var/www/rr"

/usr/bin/expect <<-EOF
    spawn $command1;
    expect {
        "*password:" {send "$pw\r"; }
        "*(yes/no)?" {send "yes\r"; }
    }
    expect "*#"
    send "rm -rf /var/www/rr\r"
    set timeout -1
    expect "*#"
    send "mkdir -p /var/www/rr\r"
    set timeout -1
    expect "*#"
    send "exit\r"
    expect "*$"
    spawn $copy1;
    expect {
        "*password:" {send "$pw\r"; }
        "*(yes/no)?" {send "yes\r"; }
    }
    set timeout -1
    expect "*$"
expect eof
EOF
