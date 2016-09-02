//
//  FileSystem.m
//  Real_Pitch
//
//  Created by iKooB on 9/2/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(FileSystem, NSObject);

RCT_EXTERN_METHOD(getFoldersWithMusic:(RCTPromiseResolveBlock) resolve reject:(RCTPromiseRejectBlock) reject);

@end
