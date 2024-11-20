// Classifying the triangle
document.getElementById('triangle-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const sideA = parseFloat(document.getElementById('side-a').value);
    const sideB = parseFloat(document.getElementById('side-b').value);
    const sideC = parseFloat(document.getElementById('side-c').value);

    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
        alert("Please enter valid positive numbers for all sides.");
        return;
    }

    let triangleType = "";

    if (sideA === sideB && sideB === sideC) {
        triangleType = "Equilateral Triangle";
    } else if (sideA === sideB || sideB === sideC || sideA === sideC) {
        triangleType = "Isosceles Triangle";
    } else {
        triangleType = "Scalene Triangle";
    }

    // Calculate angles using the Law of Cosines
    const angleA = Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) * (180 / Math.PI);
    const angleB = Math.acos((sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    // Update the text content with the triangle type and angles
    const resultElement = document.getElementById('triangle-type');
    resultElement.innerHTML = `
        The triangle is: ${triangleType}<br>
        Angles: Angle A = ${angleA.toFixed(2)}°, Angle B = ${angleB.toFixed(2)}°, Angle C = ${angleC.toFixed(2)}°
    `;

    // Draw the triangle with sides and angles
    drawTriangle(sideA, sideB, sideC, angleA, angleB, angleC);
});

// Calculating triangle angles using Law of Cosines
document.getElementById('angle-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const a = parseFloat(document.getElementById('side1').value);
    const b = parseFloat(document.getElementById('side2').value);
    const c = parseFloat(document.getElementById('side3').value);

    // Check for valid inputs
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        alert("Please enter valid positive numbers for all sides.");
        return;
    }

    // Ensure the sides form a valid triangle (triangle inequality theorem)
    if (a + b <= c || b + c <= a || c + a <= b) {
        alert("The entered sides do not form a valid triangle.");
        return;
    }

    // Law of Cosines to calculate the angles
    const angleA = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    document.getElementById('angle-results').textContent = `
        Angles: Angle A = ${angleA.toFixed(2)}°, Angle B = ${angleB.toFixed(2)}°, Angle C = ${angleC.toFixed(2)}°
    `;

    // Draw the triangle with sides and angles
    drawTriangle(a, b, c, angleA, angleB, angleC);
});

function drawTriangle(a, b, c, angleA, angleB, angleC) {
    const svg = document.getElementById('triangle-svg');
    svg.innerHTML = ""; // Clear previous triangle

    // Check if the triangle is valid
    if (a + b <= c || b + c <= a || c + a <= b) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 150);
        text.setAttribute("y", 150);
        text.setAttribute("text-anchor", "middle");
        text.textContent = "Invalid Triangle";
        svg.appendChild(text);
        return;
    }

    const scale = 50; // Adjust the scale if necessary

    // Define triangle points
    const A = { x: 50, y: 250 };
    const B = { x: A.x + c * scale, y: A.y };
    const C = {
        x: B.x - a * Math.cos((angleB * Math.PI) / 180) * scale,
        y: B.y - a * Math.sin((angleB * Math.PI) / 180) * scale
    };

    // Draw the triangle
    const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle.setAttribute("points", `${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`);
    triangle.setAttribute("fill", "none");
    triangle.setAttribute("stroke", "#a73939");
    triangle.setAttribute("stroke-width", "2");
    svg.appendChild(triangle);

    // Label the triangle
    labelTriangle(svg, A, B, C, a, b, c, angleA, angleB, angleC);
}

function labelTriangle(svg, A, B, C, a, b, c, angleA, angleB, angleC) {
    const scale = 50;

    // Label sides
    const sideA = midpoint(B, C);
    const sideB = midpoint(A, C);
    const sideC = midpoint(A, B);

    addLabel(svg, sideA.x, sideA.y, `${a}`);
    addLabel(svg, sideB.x, sideB.y, `${b}`);
    addLabel(svg, sideC.x, sideC.y, `${c}`);

    // Label angles (rounded to 2 decimal places)
    const angleOffset = 20; // Offset labels slightly for readability
    addLabel(svg, A.x - angleOffset, A.y + angleOffset, `${angleA.toFixed(2)}°`);
    addLabel(svg, B.x + angleOffset, B.y + angleOffset, `${angleB.toFixed(2)}°`);
    addLabel(svg, C.x - angleOffset, C.y - angleOffset, `${angleC.toFixed(2)}°`);
}


// Helper: Calculate midpoint between two points
function midpoint(P1, P2) {
    return {
        x: (P1.x + P2.x) / 2,
        y: (P1.y + P2.y) / 2
    };
}

// Helper: Add label to the SVG
function addLabel(svg, x, y, textContent) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.textContent = textContent;
    svg.appendChild(text);
}

