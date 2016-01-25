#!/bin/bash

while [ 0 -lt 4 ] 
do
cpu=$(mpstat | grep all | awk '{print $13}')
mem=$(free | grep Mem: | awk '{print $3}')
echo $cpu : $mem 
echo $cpu >> cpu_u_1
echo $mem >> mem_u_1
sleep 5
done
