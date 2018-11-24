./scripts/build-config.sh

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod update; cd -)
fi
