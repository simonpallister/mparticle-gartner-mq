/* eslint-disable no-console */
import { useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import mParticle from '@mparticle/web-sdk';
import { Page } from '../../layouts/Page';
import { ProductList } from '../../features/ProductDetails';
import products from '../../models/Products';
import { v4 as uuidv4 } from 'uuid'

const ShopPage = () => {
    // As per React conventions, it is recommended to trigger each mParticle
    // event in its own useEffect call.
    useEffect(() => {
        // To simulate a pageview with an SPA, we are triggering a
        // PageView whenever the Shop Page component is mounted.
        // In the case of this example application, our Shop Page
        // is our Landing page, so we are logging it as a "Landing"
        // Page View
        mParticle.logPageView('Landing');
    });

    useEffect(() => {
        // As our sample application represents a simple, streamlined use case,
        // we are simply using a single Product Impression to identify that a list of
        // products was viewed by the visitor. In most cases, you may have multiple
        // product lists within a single view. For example, Featured Products vs
        // Recommended or Related Products. Each of these would be considered a
        // separate list of products. You can also use a product impression event
        // for a single product as well.

        // First we convert our array of products to a array of mParticle products
        // so that your fields can be mapped to the necessary mParticle eCommerce
        // attributes
        // For more information, please review our Docs:
        // https://docs.mparticle.com/developers/sdk/web/commerce-tracking/#tracking-basic-purchases
        const mParticleProducts = products.map(({ label, id, price }) =>
            mParticle.eCommerce.createProduct(label, id, price),
        );

        // We then create a product impression
        const impressions = mParticle.eCommerce.createImpression(
            'Product List Impression',
            mParticleProducts,
        );

        // Then log the product impression
        mParticle.eCommerce.logImpression(impressions);
    });

    const changeConsent = (consent: boolean, purpose: string,) => {
        const user = mParticle.Identity.getCurrentUser()
        const consentObject = mParticle.Consent.createGDPRConsent(
            consent,
            Date.now(),
            purpose,
            "Head Office",
            `DAS:${mParticle.getDeviceId()}`

        )
        const consentState = mParticle.Consent.createConsentState()
        consentState.addGDPRConsentState(purpose, consentObject)
        user.setConsentState(consentState)
        mParticle.logEvent("Consent Change", mParticle.EventType.UserPreference,
            {
                Consent: consent,
                Purpose: purpose,
                Location: "Head Office",
                Device: `DAS:${mParticle.getDeviceId()}`
            }
        )
    }

    const dsr_request = async () => {
        const current_user =  mParticle.Identity.getCurrentUser()
        const body = {
            "regulation": "gdpr",
            "subject_request_id": uuidv4(),
            "subject_request_type": "erasure",
            "submitted_time": new Date().toISOString(),
            "subject_identities": {
              "email": {
                "value": current_user.getUserIdentities().userIdentities.email,
                "encoding": "raw"
              }
            },
            "api_version": "3.0",
        }
        
        const response = await fetch("https://opendsr.mparticle.com/v3/requests/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + process.env.REACT_APP_MPARTICLE_BASIC_AUTH
                },
                body:JSON.stringify(body)
            }
        )

        console.log(response)
    }


    return (
        <Page>
            <Box
                sx={{
                    my: 5,
                }}
            >
                <Typography variant='h3'>Shop Higgs Sports Gear</Typography>
            </Box>
            <ProductList products={products} testId='shop-product-list' />
            <Grid container spacing={2} justifyContent="center" sx={{
                    my: 5,
                }}>

            <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={()=> changeConsent(true, "marketing")}
                    >
                    Allow Marketing
                    </Button>
                    </Grid>
                    <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={()=> changeConsent(false, "marketing")}
                    >
                    Decline Marketing
                    </Button>
                    </Grid>
                <Grid item>
                    <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={()=> changeConsent(true, "analytics")}
                    >
                    Allow Analytics
                    </Button>
                </Grid>
                <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={()=> changeConsent(false, "analytics")}
                    >
                    Decline Analytics
                    </Button>
                    </Grid>
                    <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={dsr_request}
                    >
                    Delete My Data
                    </Button>
                    </Grid>
            </Grid>
        </Page>
    );
};

export default ShopPage;
