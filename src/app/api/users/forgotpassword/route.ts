import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    console.log('in tryyyyy--------');

    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email);

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    console.log('user', user);

    await sendEmail({
      email,
      emailType: 'RESET',
      userId: user._id,
    });

    return NextResponse.json(
      { message: 'Reset link sent to email', success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
