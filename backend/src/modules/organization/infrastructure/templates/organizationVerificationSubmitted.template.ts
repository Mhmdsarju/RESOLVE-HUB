export const organizationVerificationSubmittedTemplate = (organizationName: string,): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ResolveHub - Verification Submitted</title>
</head>

<body style="margin:0; padding:0; background-color:#EDEAE3; font-family:'Segoe UI', Arial, sans-serif;">

<div style="display:none; max-height:0; overflow:hidden; opacity:0;">
  Your ResolveHub organization verification request has been submitted successfully.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  style="background-color:#EDEAE3; padding:32px 0;">

<tr>
<td align="center">

<table role="presentation" width="480" cellpadding="0" cellspacing="0"
  style="
    background-color:#FFFFFF;
    border-radius:14px;
    overflow:hidden;
    box-shadow:0 4px 24px rgba(61,34,38,0.12);
  ">

<tr>
<td
  style="
    background-color:#4B3932;
    padding:36px 40px 28px 40px;
  "
  align="center"
>

<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<div
  style="
    display:inline-block;
    padding:8px;
    border:2px solid #F3E7D3;
    border-radius:16px;
    background-color:transparent;
  "
>
<img
  src="cid:resolvehub-logo"
  alt="ResolveHub Logo"
  width="72"
  height="72"
  style="
    display:block;
    border-radius:12px;
  "
/>
</div>

</td>
</tr>
</table>

<div
  style="
    margin-top:16px;
    font-size:24px;
    font-weight:700;
    color:#F3E7D3;
    letter-spacing:0.5px;
  "
>
  ResolveHub
</div>

<div
  style="
    margin-top:4px;
    font-size:12.5px;
    color:#D8C4A8;
    letter-spacing:0.6px;
    text-transform:uppercase;
  "
>
  Respond Faster. Resolve Smarter.
</div>

</td>
</tr>

<tr>
<td style="padding:40px 40px 8px 40px;">

<p
  style="
    margin:0 0 6px 0;
    font-size:15px;
    color:#4B3932;
    font-weight:600;
  "
>
  Verification submitted,
</p>

<p
  style="
    margin:0 0 24px 0;
    font-size:14.5px;
    line-height:22px;
    color:#5A4A4A;
  "
>
  Your organization
  <strong style="color:#4B3932;">
    ${organizationName}
  </strong>
  has been successfully submitted for verification.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:0 40px 24px 40px;">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
<tr>

<td
  align="center"
  style="
    background-color:#FBF6EC;
    border:1.5px solid #D8C4A8;
    border-radius:12px;
    padding:22px;
  "
>

<div
  style="
    font-size:12px;
    letter-spacing:1.5px;
    color:#9C7B3F;
    text-transform:uppercase;
    margin-bottom:8px;
    font-weight:600;
  "
>
  Verification Status
</div>

<div
  style="
    font-size:20px;
    font-weight:700;
    color:#4B3932;
  "
>
  Under Review
</div>

<p
  style="
    margin:8px 0 0;
    font-size:13px;
    line-height:20px;
    color:#8A7A72;
  "
>
  Your request is now waiting for Super Admin review.
</p>

</td>

</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:0 40px 24px 40px;">

<p
  style="
    margin:0;
    font-size:13.5px;
    line-height:20px;
    color:#8A7A72;
  "
>
  Our administration team will review your organization details.
  You will receive another email once your verification has been
  approved or if changes are required.
</p>

</td>
</tr>

<tr>
<td style="padding:0 40px;">
<div style="border-top:1px solid #EFE7DA;"></div>
</td>
</tr>

<tr>
<td style="padding:20px 40px 8px 40px;">

<p
  style="
    margin:0;
    font-size:12.5px;
    line-height:19px;
    color:#A99A90;
  "
>
  Please keep your organization information accurate while your
  verification request is being reviewed.
</p>

</td>
</tr>

<tr>
<td
  style="
    background-color:#F7F2E9;
    padding:24px 40px;
    text-align:center;
  "
>

<div
  style="
    font-size:13px;
    font-weight:700;
    color:#4B3932;
    letter-spacing:0.4px;
  "
>
  ResolveHub
</div>

<div
  style="
    font-size:11.5px;
    color:#B0A18F;
    margin-top:4px;
  "
>
  Enterprise Incident Management &amp; War Room Collaboration
</div>

<div
  style="
    font-size:11px;
    color:#C6BAA8;
    margin-top:12px;
  "
>
  © 2026 ResolveHub. All rights reserved.
</div>

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
  `;
};