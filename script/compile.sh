#
# compiles jade
#


msu_require "console"


log "getting aware"
AWARE=$(node script/aware.js)


log "compiling jade files"
jade src/jade --obj "${AWARE}" --out .
