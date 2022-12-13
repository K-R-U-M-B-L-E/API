#!/bin/bash

echo "RUNNING INIT SCRIPT";
aws --endpoint-url=http://localhost:4566 s3 mb s3://s3-bucket-test;
sleep infinity;