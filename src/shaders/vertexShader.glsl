uniform float utime;
varying vec2 vUv;

void main(){
    vec3 newPosition = position;
    vec2 newUv = uv - 0.5; 
     float dist = distance(newUv, vec2(0.0));
    newPosition.z += sin(dist * 10.0 - utime * 5.0) * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}