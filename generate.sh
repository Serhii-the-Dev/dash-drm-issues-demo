#!/bin/bash

STATIC_PATH=static
STATIC_TMP=$STATIC_PATH/tmp

# Tracks properties
SIZE=1920x1080
DURATION=60

# DRM
PLAYREADY_KEY=XVBovsmzhP9gRIZxWfFta3VVRPzVEWmJsazEJ46I
VIDEO_KID=cc2b5c91-37e6-4bd2-9982-864216078635
LA_URL="http://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:$VIDEO_KID)"

# Prepare the stage
rm -rf $STATIC_PATH
mkdir -p $STATIC_TMP

# Sample video, keep yuv420p for a sake of good
ffmpeg -f lavfi -i "testsrc=duration=$DURATION:size=$SIZE:rate=30" -c:v h264 -vf format=yuv420p $STATIC_TMP/video-0.mp4

# Prepare moofs
mp4fragment $STATIC_TMP/video-0.mp4 $STATIC_TMP/video-0.frag.mp4

# Unprotected video manifest
mp4dash $STATIC_TMP/video-0.frag.mp4 -o $STATIC_PATH/0 --mpd-name manifest.mpd

# PlayReady-protected video manifest
VIDEO_KID_WITHOUT_HYPENS="$(tr -d '-' <<<$VIDEO_KID)"
mp4dash --encryption-key=$VIDEO_KID_WITHOUT_HYPENS:"#$PLAYREADY_KEY" --playready-header=LA_URL:$LA_URL $STATIC_TMP/video-0.frag.mp4 -o $STATIC_PATH/1 --mpd-name manifest.mpd

# And final cleanup
rm -rf $STATIC_TMP
