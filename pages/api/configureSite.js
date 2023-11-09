import path from 'path';
import fs from 'fs';

const vercelPaths = {
    scriptPath:  path.join('pages', "api", "python", "appv2.py"),
    outputPath: path.join('/tmp', "output.json"),
    multioutputPath: path.join('/tmp', 'multioutput.json'),
    inputPath: path.join('/tmp', "input.json"),
    packagesPath: path.join('/tmp', "packages.json"),
    ordersPath: path.join('/tmp', "orders.json")
}

