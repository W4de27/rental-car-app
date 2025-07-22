<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AZ-Masim Rental Contract</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            margin: 0;
            padding: 20px;
        }

        .header {
            background-color: #1e293b;
            color: white;
            padding: 10px;
            text-align: center;
            border-bottom: 3px solid #f59e0b;
        }

        .sub-header {
            font-size: 10px;
            color: #facc15;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        td {
            padding: 5px 10px;
            vertical-align: top;
        }

        .section-title {
            font-weight: bold;
            font-size: 13px;
            padding-top: 10px;
            text-transform: uppercase;
        }

        .label {
            font-weight: bold;
            color: #374151;
        }

        ul {
            font-size: 10px;
            margin: 5px 0 0 15px;
            padding: 0;
        }

        .signatures {
            margin-top: 30px;
        }

        .signature-box {
            width: 48%;
            display: inline-block;
            text-align: left;
            vertical-align: top;
        }

        .line {
            border-top: 1px solid #999;
            margin-top: 40px;
            width: 100%;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 10px;
            color: #555;
        }
    </style>
</head>
<body>

    <!-- HEADER -->
    <div class="header">
        <h2>AZ-MASIM RENTAL CONTRACT</h2>
        <div class="sub-header">OFFICIAL AGREEMENT DOCUMENT</div>
    </div>

    <!-- DETAILS TABLE -->
    <table>
        <tr>
            <td class="section-title" colspan="2">Reservation & Client Information</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Contract #:</span> {{ $reservation->reservation_code }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Issued:</span> {{ now()->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Phone:</span> {{ $reservation->phone ?? 'N/A' }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Name:</span> {{ $reservation->user->name }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Email:</span> {{ $reservation->user->email }}</td>
        </tr>

        <tr><td colspan="2" class="section-title">Vehicle Information</td></tr>
        <tr>
            <td colspan="2"><span class="label">Model:</span> {{ $reservation->car->model }} ({{ $reservation->car->year }})</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Seats:</span> {{ $reservation->car->seats }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Transmission:</span> {{ ucfirst($reservation->car->transmission) }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Fuel Type:</span> {{ $reservation->car->fuel_type }}</td>
        </tr>

        <tr><td colspan="2" class="section-title">Rental Period</td></tr>
        <tr>
            <td colspan="2"><span class="label">Start Date:</span> {{ \Carbon\Carbon::parse($reservation->start_date)->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">End Date:</span> {{ \Carbon\Carbon::parse($reservation->end_date)->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Duration:</span> {{ $reservation->duration }} days</td>
        </tr>

        <tr><td colspan="2" class="section-title">Payment Details</td></tr>
        <tr>
            <td colspan="2"><span class="label">Daily Rate:</span> {{ number_format($reservation->car->daily_price, 2) }} MAD</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Total Price:</span> {{ number_format($reservation->total_price, 2) }} MAD</td>
        </tr>
        <tr>
            <td colspan="2"><span class="label">Amount Paid:</span> {{ number_format($reservation->price_paid, 2) }} MAD</td>
        </tr>

        <tr><td colspan="2" class="section-title">Key Terms</td></tr>
        <tr>
            <td colspan="2">
                <ul>
                    <li>Late return fee: $50/hour after 1-hour grace period</li>
                    <li>No smoking — $150 cleaning fee</li>
                    <li>200km/day limit — $0.50/km after</li>
                    <li>Return fuel at same level</li>
                    <li>Client responsible for traffic violations</li>
                </ul>
            </td>
        </tr>
    </table>

    <!-- SIGNATURES -->
    <div class="signatures">
        <div class="signature-box">
            <strong>Client Signature</strong>
            <div class="line"></div>
            Date: _______________
        </div>
        <div class="signature-box" style="float: right;">
            <strong>AZ-Masim Representative</strong>
            <div class="line"></div>
            Date: _______________
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        This document is a legal agreement between AZ-Masim and the client. <br>
        By signing, you accept all terms. <br>
        AZ-Masim © {{ date('Y') }} | contact@az-masim.com | +212 6 23 74 18 64
    </div>
</body>
</html>
