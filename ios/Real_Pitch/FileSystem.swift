//
//  FileSystem.swift
//  Real_Pitch
//
//  Created by iKooB on 9/2/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

@objc(FileSystem)
class FileSystem : NSObject {
  @objc func getFoldersWithMusic(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let fileManager = NSFileManager.defaultManager();
    let fileSystemEnum = fileManager.enumeratorAtPath("/Users");
    
    var nextObject = fileSystemEnum!.nextObject()!;
    
    while true {
      print(nextObject);
      nextObject = fileSystemEnum!.nextObject()!
    }
  }
}