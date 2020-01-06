import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = 
`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" id="svg2816" version="1.1" inkscape:version="0.47 r22583" width="94" height="128" viewBox="0 0 94 128" sodipodi:docname="pin.svg">
  <metadata id="metadata2822">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs id="defs2820">
    <inkscape:perspective sodipodi:type="inkscape:persp3d" inkscape:vp_x="0 : 0.5 : 1" inkscape:vp_y="0 : 1000 : 0" inkscape:vp_z="1 : 0.5 : 1" inkscape:persp3d-origin="0.5 : 0.33333333 : 1" id="perspective2824"/>
  </defs>
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1126" inkscape:window-height="809" id="namedview2818" showgrid="false" inkscape:zoom="3.0991164" inkscape:cx="44.920355" inkscape:cy="60.493358" inkscape:window-x="287" inkscape:window-y="0" inkscape:window-maximized="0" inkscape:current-layer="svg2816"/>
  <path style="fill:#c64242;fill-opacity:0.98823529" d="M 46.977003,126.64334 C 46.693972,125.95584 40.813862,120.20567 36.603071,114.98067 11.655836,81.858372 -16.158365,51.082905 16.319943,13.682837 30.700637,-0.21083367 48.43303,-1.0034227 66.662563,5.4726973 117.9922,35.174601 80.828906,83.627914 56.427079,115.48067 l -9.450076,11.16267 z M 62.417383,75.872046 C 96.654166,51.387445 70.185413,4.2391813 32.569429,19.913013 21.585178,25.769872 16.134954,35.960547 15.944071,47.980664 c -0.524495,11.693153 5.685418,21.471037 15.526227,27.460808 7.055481,3.840074 10.157178,4.533661 18.145697,4.057654 5.177622,-0.308516 8.161127,-1.153847 12.801388,-3.62708 z" id="path4127" sodipodi:nodetypes="ccccccccccsc"/>
  <path sodipodi:type="arc" style="fill:#c64242;fill-opacity:0.98823529;fill-rule:nonzero;stroke:none" id="path4129" sodipodi:cx="52.363636" sodipodi:cy="49.05526" sodipodi:rx="51.222816" sodipodi:ry="41.754009" d="m 41.682107,89.891342 a 51.222816,41.754009 0 1 1 1.276617,0.208091" sodipodi:start="1.7808687" sodipodi:end="8.0386371" sodipodi:open="true" transform="matrix(0.87829487,0,0,1.0519028,0.55474126,-6.9952658)"/>
  <path sodipodi:type="arc" style="opacity:0.34016395;fill:#000000;fill-opacity:0;fill-rule:nonzero;stroke:none" id="path4131" sodipodi:cx="49.05526" sodipodi:cy="48.59893" sodipodi:rx="26.010695" sodipodi:ry="20.991087" d="m 43.631232,69.128546 a 26.010695,20.991087 0 1 1 0.64826,0.104614" sodipodi:start="1.7808687" sodipodi:end="8.0386371" sodipodi:open="true" transform="translate(0.64534523,0)"/>
  <path sodipodi:type="arc" style="fill:#000080;fill-opacity:0;fill-rule:nonzero;stroke:none" id="path4135" sodipodi:cx="35.365417" sodipodi:cy="102.78788" sodipodi:rx="16.655972" sodipodi:ry="11.750445" d="m 31.892136,114.28 a 16.655972,11.750445 0 1 1 0.415114,0.0586" sodipodi:start="1.7808687" sodipodi:end="8.0386371" sodipodi:open="true" transform="translate(0.64534523,0)"/>
  <path sodipodi:type="arc" style="fill:#b72c2c;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path4149" sodipodi:cx="52.705883" sodipodi:cy="52.021389" sodipodi:rx="34.452763" sodipodi:ry="33.540108" d="m 45.521425,84.824145 a 34.452763,33.540108 0 1 1 0.85866,0.167155" sodipodi:start="1.7808687" sodipodi:end="8.0386371" sodipodi:open="true" transform="matrix(0.97020484,0,0,1.0272058,-4.0587829,-5.7503824)"/>
  <path sodipodi:type="arc" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path4184" sodipodi:cx="64.211853" sodipodi:cy="68.789574" sodipodi:rx="34.203297" sodipodi:ry="36.623341" d="m 57.079416,104.60778 a 34.203297,36.623341 0 1 1 0.852443,0.18252" sodipodi:start="1.7808687" sodipodi:end="8.0386371" sodipodi:open="true" transform="matrix(0.64629924,0,0,0.61681122,5.1261236,4.9013803)"/>
</svg>`

export default () => <SvgXml xml={xml} width="100%" height="100%" />;